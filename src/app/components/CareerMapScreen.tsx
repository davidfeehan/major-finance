import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, CheckCircle, Lock, Trophy, MapPin, Flag } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { useTheme, MILITARY_THEMES } from './ThemeProvider';
import { OPERATIONS } from '../constants/operations';
import { MISSIONS_DATA, getMissionById, getMissionStatus } from '../constants/missionsData';

interface UserData {
  xp: number;
  completedMissions: number;
  completedMissionsList?: string[];
  rank?: string;
}

interface CareerMapScreenProps {
  userData: UserData;
  onMissionSelect: (missionId: string) => void;
  onBack: () => void;
  isDemo?: boolean;
}

// Layout constants for the serpentine "S-curve" path
const NODE_SIZE = 58;
const TOKEN_SIZE = 38;
const ROW_HEIGHT = 120;
const SECTOR_GAP = 68;
const PAD_X = 16;

type NodeStatus = 'completed' | 'in-progress' | 'available' | 'locked';

interface PlacedNode {
  mission: ReturnType<typeof getMissionById>;
  operationId: string;
  status: NodeStatus;
  x: number; // center x in px
  y: number; // center y in px
}

interface SectorLabel {
  operationId: string;
  title: string;
  gradient: string;
  y: number; // top of the label band in px
}

interface MapLayout {
  nodes: PlacedNode[];
  sectors: SectorLabel[];
  totalHeight: number;
}

/**
 * Career Map — a vertical, mobile-first "S-curve" deployment map that lays the
 * real mission catalog (MISSIONS_DATA / OPERATIONS) out along a snaking path.
 * Each operation becomes a themed sector; each mission becomes an interactive
 * node. A player token marks the next actionable mission, and tapping any
 * unlocked node routes into the real mission via onMissionSelect.
 */
export function CareerMapScreen({ userData, onMissionSelect, onBack, isDemo = false }: CareerMapScreenProps) {
  const { theme } = useTheme();
  const branchInfo = MILITARY_THEMES[theme.branch];
  const completedList = useMemo(
    () => userData.completedMissionsList || [],
    [userData.completedMissionsList]
  );
  const completedCount = completedList.length;

  const boardRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  // Measure the board width so node positions stay responsive.
  useLayoutEffect(() => {
    const el = boardRef.current;
    if (!el) return;

    const update = () => setWidth(el.clientWidth);
    update();

    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Ordered list of missions grouped by operation (the "sectors").
  const ordered = useMemo(() => {
    const list: { missionId: string; operationId: string; isSectorStart: boolean }[] = [];
    Object.values(OPERATIONS).forEach((operation) => {
      operation.missions.forEach((missionId, idx) => {
        if (getMissionById(missionId)) {
          list.push({ missionId, operationId: operation.id, isSectorStart: idx === 0 });
        }
      });
    });
    return list;
  }, []);

  // Build the serpentine layout once the width is known.
  const layout = useMemo<MapLayout>(() => {
    if (width <= 0) return { nodes: [], sectors: [], totalHeight: 0 };

    const cols = width < 480 ? 3 : 4;
    const usable = width - PAD_X * 2;
    const colWidth = usable / cols;

    const nodes: PlacedNode[] = [];
    const sectors: SectorLabel[] = [];

    let col = 0;
    let rowIndex = 0;
    let yCursor = SECTOR_GAP * 0.4;

    ordered.forEach((item, i) => {
      if (item.isSectorStart) {
        // Start each sector on a fresh row and reserve a band for its label.
        if (i !== 0 && col !== 0) {
          col = 0;
          rowIndex += 1;
          yCursor += ROW_HEIGHT;
        }
        const operation = OPERATIONS[item.operationId];
        sectors.push({
          operationId: operation.id,
          title: operation.title,
          gradient: operation.gradient,
          y: yCursor,
        });
        yCursor += SECTOR_GAP;
      }

      // Snake direction alternates per row to form the S-curve.
      const visualCol = rowIndex % 2 === 0 ? col : cols - 1 - col;
      const x = PAD_X + (visualCol + 0.5) * colWidth;

      nodes.push({
        mission: getMissionById(item.missionId),
        operationId: item.operationId,
        status: getMissionStatus(item.missionId, completedList, completedCount),
        x,
        y: yCursor,
      });

      col += 1;
      if (col >= cols) {
        col = 0;
        rowIndex += 1;
        yCursor += ROW_HEIGHT;
      }
    });

    return { nodes, sectors, totalHeight: yCursor + ROW_HEIGHT };
  }, [width, ordered, completedList, completedCount]);

  // The token sits on the next actionable (available) mission, or the last node.
  const tokenNode = useMemo(() => {
    if (layout.nodes.length === 0) return null;
    const next = layout.nodes.find((n) => n.status === 'available');
    if (next) return next;
    const lastCompleted = [...layout.nodes].reverse().find((n) => n.status === 'completed');
    return lastCompleted || layout.nodes[0];
  }, [layout.nodes]);

  const svgPath = useMemo(() => {
    if (layout.nodes.length === 0) return '';
    return layout.nodes
      .map((n, i) => `${i === 0 ? 'M' : 'L'} ${n.x.toFixed(1)} ${n.y.toFixed(1)}`)
      .join(' ');
  }, [layout.nodes]);

  const totalMissions = MISSIONS_DATA.length;
  const progressPercentage = totalMissions > 0 ? (completedCount / totalMissions) * 100 : 0;

  return (
    <div className="min-h-full bg-background">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <Button variant="ghost" size="sm" onClick={onBack} className="-ml-2">
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              Operations
            </Button>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="gap-1">
                <Trophy className="w-3 h-3" />
                {completedCount}/{totalMissions}
              </Badge>
              <span className="text-sm text-muted-foreground hidden sm:inline">{branchInfo.name}</span>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
            <h1 className="text-base font-semibold tracking-tight flex-1 truncate">
              {isDemo ? 'SSG Martinez — Financial Deployment Map' : 'Financial Deployment Map'}
            </h1>
          </div>
          <Progress value={progressPercentage} className="h-2 mt-2" />
        </div>
      </div>

      {/* The Map Board */}
      <div className="max-w-3xl mx-auto px-2 pb-24">
        <div
          ref={boardRef}
          className="relative w-full"
          style={{ height: layout.totalHeight || 600 }}
        >
          {/* SVG path track linking the nodes */}
          {svgPath && (
            <svg
              className="absolute inset-0 pointer-events-none"
              width={width}
              height={layout.totalHeight}
              style={{ zIndex: 1 }}
            >
              <path
                d={svgPath}
                fill="none"
                strokeWidth={8}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ stroke: 'var(--border)', opacity: 0.5 }}
              />
              <path
                d={svgPath}
                fill="none"
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="2 12"
                style={{ stroke: 'var(--primary)', opacity: 0.6 }}
              />
            </svg>
          )}

          {/* Sector labels */}
          {layout.sectors.map((sector) => (
            <div
              key={sector.operationId}
              className="absolute left-0 z-[2]"
              style={{ top: sector.y, transform: 'translateY(-50%)' }}
            >
              <div
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg shadow-md border border-white/10 bg-gradient-to-r ${sector.gradient}`}
              >
                <Flag className="w-3.5 h-3.5 text-white" />
                <span className="text-xs font-semibold uppercase tracking-wide text-white">
                  {sector.title.replace(' Operation', '').replace(' Operations', '')}
                </span>
              </div>
            </div>
          ))}

          {/* Mission nodes */}
          {layout.nodes.map((node) => {
            const mission = node.mission;
            if (!mission) return null;
            const Icon = mission.icon;
            const isLocked = node.status === 'locked';
            const isCompleted = node.status === 'completed';

            return (
              <button
                key={mission.id}
                type="button"
                disabled={isLocked}
                onClick={() => !isLocked && onMissionSelect(mission.id)}
                title={`${mission.title}${isLocked ? ' (Locked)' : ''}`}
                aria-label={`${mission.title} — ${node.status}`}
                className={`absolute z-[3] flex flex-col items-center justify-center rounded-2xl border-2 shadow-lg transition-transform duration-200 ${
                  isLocked
                    ? 'bg-muted border-border opacity-60 cursor-not-allowed'
                    : isCompleted
                    ? 'bg-gradient-to-br from-green-500 to-green-700 border-green-300 cursor-pointer hover:scale-110'
                    : `bg-gradient-to-br ${OPERATIONS[node.operationId].gradient} border-white/30 cursor-pointer hover:scale-110`
                } ${mission.featured && !isLocked ? 'ring-2 ring-yellow-400 ring-offset-2 ring-offset-background' : ''}`}
                style={{
                  width: NODE_SIZE,
                  height: NODE_SIZE,
                  left: node.x - NODE_SIZE / 2,
                  top: node.y - NODE_SIZE / 2,
                }}
              >
                {isCompleted ? (
                  <CheckCircle className="w-6 h-6 text-white" />
                ) : isLocked ? (
                  <Lock className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <Icon className="w-6 h-6 text-white" />
                )}
              </button>
            );
          })}

          {/* Player token */}
          {tokenNode && (
            <div
              className="absolute z-[4] flex items-center justify-center rounded-full pointer-events-none"
              style={{
                width: TOKEN_SIZE,
                height: TOKEN_SIZE,
                left: tokenNode.x - TOKEN_SIZE / 2,
                top: tokenNode.y - NODE_SIZE / 2 - TOKEN_SIZE + 6,
                transition: 'left 0.6s cubic-bezier(0.25, 1, 0.5, 1), top 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
                filter: 'drop-shadow(0 0 8px rgba(234, 179, 8, 0.8))',
              }}
            >
              <span className="text-2xl leading-none">🎖️</span>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-gradient-to-br from-green-500 to-green-700 inline-block" />
            Completed
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-primary inline-block" />
            Available
          </span>
          <span className="flex items-center gap-1.5">
            <Lock className="w-3 h-3" />
            Locked
          </span>
          <span className="flex items-center gap-1.5">
            🎖️ You are here
          </span>
        </div>
      </div>
    </div>
  );
}

export default CareerMapScreen;
