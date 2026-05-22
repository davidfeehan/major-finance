import { useState, useCallback } from 'react';
import { getDemoMissionData } from '../utils/demoData';

export interface MissionCompletionData {
  missionTitle: string;
  missionId: string;
  xpEarned: number;
  stars: number;
  achievements: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
  userQuote?: string;
  nextMission?: {
    id: string;
    title: string;
    description: string;
    xpReward: number;
  };
}

export function useMissionCompletion() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [completionData, setCompletionData] = useState<MissionCompletionData | null>(null);

  const showCompletionModal = useCallback((data: MissionCompletionData) => {
    setCompletionData(data);
    setIsModalOpen(true);
  }, []);

  const hideCompletionModal = useCallback(() => {
    setIsModalOpen(false);
    // Keep data for a moment to allow exit animation
    setTimeout(() => setCompletionData(null), 300);
  }, []);

  // Helper to get mission completion data
  const getMissionCompletionData = useCallback((
    missionId: string,
    isDemo: boolean = false
  ): MissionCompletionData | null => {
    // Mission configurations
    const missionConfigs: Record<string, Omit<MissionCompletionData, 'userQuote'>> = {
      'emergency-fund': {
        missionTitle: 'Emergency Fund Mission',
        missionId: 'emergency-fund',
        xpEarned: 150,
        stars: 3,
        achievements: [
          {
            title: 'Safety Net Secured',
            description: 'Built your emergency fund foundation',
            icon: '🛡️'
          },
          {
            title: 'Financial Resilience',
            description: 'Protected against unexpected expenses',
            icon: '💪'
          }
        ],
        nextMission: {
          id: 'investment-basics',
          title: 'Investment Training',
          description: 'Learn the fundamentals of military-friendly investments',
          xpReward: 200
        }
      },
      'investment-basics': {
        missionTitle: 'Investment Training',
        missionId: 'investment-basics',
        xpEarned: 200,
        stars: 3,
        achievements: [
          {
            title: 'Investor Initiated',
            description: 'Started your investment journey',
            icon: '📈'
          },
          {
            title: 'Portfolio Builder',
            description: 'Created a diversified investment portfolio',
            icon: '💼'
          }
        ],
        nextMission: {
          id: 'tsp-optimization',
          title: 'TSP Optimization',
          description: 'Maximize your Thrift Savings Plan contributions',
          xpReward: 300
        }
      },
      'tsp-optimization': {
        missionTitle: 'TSP Optimization',
        missionId: 'tsp-optimization',
        xpEarned: 300,
        stars: 4,
        achievements: [
          {
            title: 'TSP Master',
            description: 'Optimized your retirement savings strategy',
            icon: '🎯'
          },
          {
            title: 'Match Maximizer',
            description: 'Capturing full government match',
            icon: '💰'
          },
          {
            title: 'Future Secured',
            description: 'On track for comfortable retirement',
            icon: '🏆'
          }
        ],
        nextMission: {
          id: 'financial-education',
          title: 'Financial Education',
          description: 'Complete modules on military-specific financial topics',
          xpReward: 200
        }
      },
      'financial-education': {
        missionTitle: 'Financial Education',
        missionId: 'financial-education',
        xpEarned: 200,
        stars: 5,
        achievements: [
          {
            title: 'Knowledge Seeker',
            description: 'Completed all financial literacy modules',
            icon: '📚'
          },
          {
            title: 'Financial Expert',
            description: 'Mastered military financial planning',
            icon: '🎓'
          },
          {
            title: 'Mentor Ready',
            description: 'Qualified to help fellow service members',
            icon: '👥'
          }
        ],
        nextMission: {
          id: 'retirement-planning',
          title: 'Retirement Planning',
          description: 'Plan your financial future with comprehensive calculator',
          xpReward: 250
        }
      },
      'retirement-planning': {
        missionTitle: 'Retirement Planning',
        missionId: 'retirement-planning',
        xpEarned: 250,
        stars: 4,
        achievements: [
          {
            title: 'Future Planner',
            description: 'Created comprehensive retirement strategy',
            icon: '📋'
          },
          {
            title: 'Goal Setter',
            description: 'Defined clear financial objectives',
            icon: '🎯'
          },
          {
            title: 'Transition Ready',
            description: 'Prepared for life after service',
            icon: '🚀'
          }
        ],
        nextMission: {
          id: 'budget-creation',
          title: 'Create a Budget',
          description: 'Build and maintain a comprehensive monthly budget',
          xpReward: 100
        }
      },
      'budget-creation': {
        missionTitle: 'Budget Creation',
        missionId: 'budget-creation',
        xpEarned: 100,
        stars: 3,
        achievements: [
          {
            title: 'Budget Builder',
            description: 'Created your first comprehensive budget',
            icon: '📊'
          },
          {
            title: 'Money Manager',
            description: 'Taking control of your finances',
            icon: '💵'
          }
        ]
      }
    };

    const config = missionConfigs[missionId];
    if (!config) return null;

    // Get demo quote if in demo mode
    let userQuote: string | undefined;
    if (isDemo) {
      const demoData = getDemoMissionData(missionId);
      userQuote = demoData?.quote;
    }

    return {
      ...config,
      userQuote
    };
  }, []);

  return {
    isModalOpen,
    completionData,
    showCompletionModal,
    hideCompletionModal,
    getMissionCompletionData
  };
}
