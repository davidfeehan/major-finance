import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { 
  Star,
  Trophy,
  Target,
  Lock,
  Unlock,
  Zap,
  TrendingUp,
  Shield,
  Award,
  Crown,
  Sparkles,
  Info
} from 'lucide-react';
import { XP_LEVELS, ACHIEVEMENTS, getLevelFromXP, getTierColor, getRarityColor } from '../constants/achievementsData';
import { MISSIONS_DATA } from '../constants/missionsData';
import { OPERATIONS } from '../constants/operations';

export function XPAchievementsGuide() {
  // Group achievements by category
  const achievementsByCategory = ACHIEVEMENTS.reduce((acc, achievement) => {
    if (!acc[achievement.category]) {
      acc[achievement.category] = [];
    }
    acc[achievement.category].push(achievement);
    return acc;
  }, {} as Record<string, typeof ACHIEVEMENTS>);

  // Group missions by operation
  const missionsByOperation = MISSIONS_DATA.reduce((acc, mission) => {
    if (!acc[mission.operationId]) {
      acc[mission.operationId] = [];
    }
    acc[mission.operationId].push(mission);
    return acc;
  }, {} as Record<string, typeof MISSIONS_DATA>);

  // Convert OPERATIONS object to array for mapping
  const operationsArray = Object.values(OPERATIONS);

  return (
    <div className="space-y-6">
      <Tabs defaultValue="xp-levels" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="xp-levels">XP & Levels</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="missions">Missions</TabsTrigger>
        </TabsList>

        {/* ============================================================================ */}
        {/* XP & LEVELS TAB */}
        {/* ============================================================================ */}
        <TabsContent value="xp-levels" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                Experience Points (XP) System
              </CardTitle>
              <CardDescription>
                Earn XP by completing missions and achievements to level up and unlock perks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* How XP Works */}
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  How XP Works
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <p><strong>Earn XP:</strong> Complete missions, earn achievements, and engage with the app</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <p><strong>Level Up:</strong> Accumulate XP to advance through military ranks (E-1 to E-9S)</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Unlock className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <p><strong>Unlock Perks:</strong> Each level unlocks new features, tools, and benefits</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Trophy className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <p><strong>Show Progress:</strong> Your rank displays your financial literacy journey</p>
                  </div>
                </div>
              </div>

              {/* XP Sources */}
              <div>
                <h3 className="font-semibold mb-3">Ways to Earn XP</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Complete Missions</span>
                      <Badge variant="secondary">150-400 XP</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Primary XP source. Strategic missions award more XP than Standard missions.
                    </p>
                  </div>

                  <div className="p-3 bg-muted rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Earn Achievements</span>
                      <Badge variant="secondary">50-2,500 XP</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Milestone rewards. Legendary achievements give massive XP bonuses.
                    </p>
                  </div>

                  <div className="p-3 bg-muted rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Daily Streaks</span>
                      <Badge variant="secondary">75-2,000 XP</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Consistency bonus. Complete missions multiple days in a row.
                    </p>
                  </div>

                  <div className="p-3 bg-muted rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Hidden Bonuses</span>
                      <Badge variant="secondary">100-300 XP</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Secret achievements for special actions (discover them yourself!).
                    </p>
                  </div>
                </div>
              </div>

              {/* Level Hierarchy */}
              <div>
                <h3 className="font-semibold mb-3">Level Hierarchy & Perks</h3>
                <div className="space-y-3">
                  {XP_LEVELS.map((level, index) => {
                    const Icon = level.icon;
                    const progress = index < XP_LEVELS.length - 1 
                      ? ((level.maxXP - level.minXP) / (XP_LEVELS[index + 1]?.minXP || level.maxXP)) * 100
                      : 100;

                    return (
                      <div key={level.level} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center`}>
                              <Icon className="w-5 h-5 text-primary-foreground" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold">{level.rank}</h4>
                                <Badge variant="outline" className="text-xs">
                                  Level {level.level}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {level.militaryPayGrade}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">
                              {level.minXP.toLocaleString()} - {level.maxXP === 999999 ? '∞' : level.maxXP.toLocaleString()} XP
                            </div>
                            {index < XP_LEVELS.length - 1 && (
                              <div className="text-xs text-muted-foreground">
                                {(level.maxXP - level.minXP + 1).toLocaleString()} XP needed
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Perks */}
                        <div className="space-y-1">
                          {level.perks.map((perk, i) => (
                            <div key={i} className="flex items-start gap-2 text-sm">
                              <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">{perk}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Leveling Tips */}
              <div className="p-4 bg-gradient-to-r from-blue-500/10 to-blue-500/5 rounded-lg border border-blue-500/20">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  Pro Tips for Fast Leveling
                </h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Complete missions daily to build streaks (consistent XP)</li>
                  <li>• Focus on Strategic missions for higher XP rewards</li>
                  <li>• Hunt for hidden achievements (Night Owl, Early Bird, etc.)</li>
                  <li>• Complete all missions in an operation for mastery achievements</li>
                  <li>• Average user reaches Level 5 (Sergeant) in 2-3 months of consistent use</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ============================================================================ */}
        {/* ACHIEVEMENTS TAB */}
        {/* ============================================================================ */}
        <TabsContent value="achievements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                All Achievements
              </CardTitle>
              <CardDescription>
                {ACHIEVEMENTS.filter(a => !a.hidden).length} discoverable achievements + {ACHIEVEMENTS.filter(a => a.hidden).length} hidden secrets
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Achievement Tiers Explanation */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {[
                  { tier: 'bronze', label: 'Bronze', description: 'Common achievements' },
                  { tier: 'silver', label: 'Silver', description: 'Uncommon achievements' },
                  { tier: 'gold', label: 'Gold', description: 'Rare achievements' },
                  { tier: 'platinum', label: 'Platinum', description: 'Epic achievements' },
                  { tier: 'diamond', label: 'Diamond', description: 'Legendary achievements' }
                ].map(({ tier, label, description }) => (
                  <div key={tier} className={`p-2 rounded-lg border ${getTierColor(tier as any)}`}>
                    <div className="font-semibold text-sm">{label}</div>
                    <div className="text-xs opacity-80">{description}</div>
                  </div>
                ))}
              </div>

              {/* Achievements by Category */}
              <Accordion type="single" collapsible className="w-full">
                {/* Mission Achievements */}
                <AccordionItem value="missions">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      <span>Mission Completion Achievements ({achievementsByCategory.missions?.length || 0})</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pt-2">
                      {achievementsByCategory.missions?.map((achievement) => {
                        const Icon = achievement.icon;
                        return (
                          <div key={achievement.id} className={`p-3 rounded-lg border ${getTierColor(achievement.tier)}`}>
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center shrink-0">
                                <Icon className="w-5 h-5 text-primary-foreground" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-semibold">{achievement.title}</h4>
                                  <Badge variant="outline" className="text-xs">
                                    +{achievement.xpReward} XP
                                  </Badge>
                                  <Badge variant="secondary" className={`text-xs ${getRarityColor(achievement.rarity)}`}>
                                    {achievement.rarity}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">
                                  {achievement.description}
                                </p>
                                <div className="text-xs text-muted-foreground">
                                  <strong>How to earn:</strong> {achievement.requirement.details || `Complete ${achievement.requirement.value} missions`}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Streak Achievements */}
                <AccordionItem value="streaks">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      <span>Streak Achievements ({achievementsByCategory.streaks?.length || 0})</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pt-2">
                      {achievementsByCategory.streaks?.map((achievement) => {
                        const Icon = achievement.icon;
                        return (
                          <div key={achievement.id} className={`p-3 rounded-lg border ${getTierColor(achievement.tier)}`}>
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center shrink-0">
                                <Icon className="w-5 h-5 text-primary-foreground" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-semibold">{achievement.title}</h4>
                                  <Badge variant="outline" className="text-xs">
                                    +{achievement.xpReward} XP
                                  </Badge>
                                  <Badge variant="secondary" className={`text-xs ${getRarityColor(achievement.rarity)}`}>
                                    {achievement.rarity}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">
                                  {achievement.description}
                                </p>
                                <div className="text-xs text-muted-foreground">
                                  <strong>How to earn:</strong> {achievement.requirement.details || `Complete missions for ${achievement.requirement.value} days in a row`}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Milestone Achievements */}
                <AccordionItem value="milestones">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      <span>Milestone Achievements ({achievementsByCategory.milestones?.length || 0})</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pt-2">
                      {achievementsByCategory.milestones?.map((achievement) => {
                        const Icon = achievement.icon;
                        return (
                          <div key={achievement.id} className={`p-3 rounded-lg border ${getTierColor(achievement.tier)}`}>
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center shrink-0">
                                <Icon className="w-5 h-5 text-primary-foreground" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-semibold">{achievement.title}</h4>
                                  <Badge variant="outline" className="text-xs">
                                    +{achievement.xpReward} XP
                                  </Badge>
                                  <Badge variant="secondary" className={`text-xs ${getRarityColor(achievement.rarity)}`}>
                                    {achievement.rarity}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">
                                  {achievement.description}
                                </p>
                                <div className="text-xs text-muted-foreground">
                                  <strong>How to earn:</strong> {achievement.requirement.details || 
                                    (achievement.requirement.type === 'xp_earned' ? `Earn ${achievement.requirement.value} total XP` :
                                     achievement.requirement.type === 'level_reached' ? `Reach level ${achievement.requirement.value}` :
                                     achievement.requirement.type === 'calculator_use' ? `Use calculators ${achievement.requirement.value} times` :
                                     'Complete the requirement')}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Mastery Achievements */}
                <AccordionItem value="mastery">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <Crown className="w-4 h-4" />
                      <span>Operation Mastery Achievements ({achievementsByCategory.mastery?.length || 0})</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pt-2">
                      {achievementsByCategory.mastery?.map((achievement) => {
                        const Icon = achievement.icon;
                        return (
                          <div key={achievement.id} className={`p-3 rounded-lg border ${getTierColor(achievement.tier)}`}>
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center shrink-0">
                                <Icon className="w-5 h-5 text-primary-foreground" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-semibold">{achievement.title}</h4>
                                  <Badge variant="outline" className="text-xs">
                                    +{achievement.xpReward} XP
                                  </Badge>
                                  <Badge variant="secondary" className={`text-xs ${getRarityColor(achievement.rarity)}`}>
                                    {achievement.rarity}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">
                                  {achievement.description}
                                </p>
                                <div className="text-xs text-muted-foreground">
                                  <strong>How to earn:</strong> {achievement.requirement.details}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Hidden Achievements */}
                <AccordionItem value="special">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      <span>Secret Achievements ({achievementsByCategory.special?.length || 0})</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="p-4 bg-gradient-to-r from-purple-500/10 to-purple-500/5 rounded-lg border border-purple-500/20 mb-3">
                      <p className="text-sm text-muted-foreground">
                        🤫 These special achievements are earned through unique actions. Discover them yourself for bonus XP!
                      </p>
                    </div>
                    <div className="space-y-2 pt-2">
                      {achievementsByCategory.special?.map((achievement) => {
                        const Icon = achievement.icon;
                        return (
                          <div key={achievement.id} className={`p-3 rounded-lg border ${getTierColor(achievement.tier)}`}>
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center shrink-0">
                                <Icon className="w-5 h-5 text-primary-foreground" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-semibold">{achievement.title}</h4>
                                  <Badge variant="outline" className="text-xs">
                                    +{achievement.xpReward} XP
                                  </Badge>
                                  <Badge variant="secondary" className={`text-xs ${getRarityColor(achievement.rarity)}`}>
                                    {achievement.rarity}
                                  </Badge>
                                  {achievement.hidden && (
                                    <Badge variant="secondary" className="text-xs">
                                      Hidden
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">
                                  {achievement.description}
                                </p>
                                <div className="text-xs text-muted-foreground">
                                  <strong>Hint:</strong> {achievement.requirement.details}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* Achievement Summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-3 bg-muted rounded-lg text-center">
                  <div className="text-2xl font-bold">{ACHIEVEMENTS.length}</div>
                  <div className="text-sm text-muted-foreground">Total Achievements</div>
                </div>
                <div className="p-3 bg-muted rounded-lg text-center">
                  <div className="text-2xl font-bold">{ACHIEVEMENTS.filter(a => !a.hidden).length}</div>
                  <div className="text-sm text-muted-foreground">Visible</div>
                </div>
                <div className="p-3 bg-muted rounded-lg text-center">
                  <div className="text-2xl font-bold">{ACHIEVEMENTS.filter(a => a.hidden).length}</div>
                  <div className="text-sm text-muted-foreground">Hidden Secrets</div>
                </div>
                <div className="p-3 bg-muted rounded-lg text-center">
                  <div className="text-2xl font-bold">
                    {ACHIEVEMENTS.reduce((sum, a) => sum + a.xpReward, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Possible XP</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ============================================================================ */}
        {/* MISSIONS TAB */}
        {/* ============================================================================ */}
        <TabsContent value="missions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Mission Hierarchy & Unlocks
              </CardTitle>
              <CardDescription>
                All missions organized by operation with unlock requirements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Mission Difficulty Explanation */}
              <div>
                <h3 className="font-semibold mb-3">Mission Difficulty Levels</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                    <Badge variant="secondary" className="mb-2 bg-green-100 text-green-700">Standard</Badge>
                    <p className="text-sm text-muted-foreground">
                      Foundation missions. Perfect for beginners. 150-200 XP.
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <Badge variant="secondary" className="mb-2 bg-blue-100 text-blue-700">Tactical</Badge>
                    <p className="text-sm text-muted-foreground">
                      Intermediate missions. Builds on basics. 200-300 XP.
                    </p>
                  </div>
                  <div className="p-3 bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded-lg">
                    <Badge variant="secondary" className="mb-2 bg-purple-100 text-purple-700">Strategic</Badge>
                    <p className="text-sm text-muted-foreground">
                      Advanced missions. Complex strategies. 300-400 XP.
                    </p>
                  </div>
                </div>
              </div>

              {/* Missions by Operation */}
              {operationsArray.map((operation) => {
                const operationMissions = missionsByOperation[operation.id] || [];
                const totalXP = operationMissions.reduce((sum, m) => sum + m.xpReward, 0);

                return (
                  <div key={operation.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{operation.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{operation.description}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{operationMissions.length} Missions</Badge>
                          <Badge variant="secondary">{totalXP} Total XP</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {operationMissions.map((mission) => {
                        const Icon = mission.icon;
                        const isLocked = !!mission.unlockRequirement;

                        return (
                          <div key={mission.id} className="p-3 bg-muted rounded-lg">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center shrink-0">
                                <Icon className="w-5 h-5 text-primary-foreground" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                  <h4 className="font-semibold">{mission.title}</h4>
                                  <Badge variant="outline" className="text-xs">
                                    +{mission.xpReward} XP
                                  </Badge>
                                  <Badge variant="secondary" className="text-xs">
                                    {mission.difficulty}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {mission.estimatedTime}
                                  </Badge>
                                  {isLocked && (
                                    <Badge variant="destructive" className="text-xs flex items-center gap-1">
                                      <Lock className="w-3 h-3" />
                                      Locked
                                    </Badge>
                                  )}
                                  {mission.featured && (
                                    <Badge className="text-xs bg-gradient-primary">
                                      Featured
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">
                                  {mission.description}
                                </p>
                                {isLocked && mission.unlockRequirement && (
                                  <div className="flex items-center gap-2 text-xs text-muted-foreground bg-background p-2 rounded">
                                    <Lock className="w-3 h-3" />
                                    <span>
                                      <strong>Unlock requirement:</strong>{' '}
                                      {mission.unlockRequirement.type === 'missions' && `Complete ${mission.unlockRequirement.value} missions`}
                                      {mission.unlockRequirement.type === 'xp' && `Reach ${mission.unlockRequirement.value} XP`}
                                      {mission.unlockRequirement.type === 'level' && `Reach Level ${mission.unlockRequirement.value}`}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {/* Mission Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-3 bg-muted rounded-lg text-center">
                  <div className="text-2xl font-bold">{MISSIONS_DATA.length}</div>
                  <div className="text-sm text-muted-foreground">Total Missions</div>
                </div>
                <div className="p-3 bg-muted rounded-lg text-center">
                  <div className="text-2xl font-bold">{MISSIONS_DATA.filter(m => !m.unlockRequirement).length}</div>
                  <div className="text-sm text-muted-foreground">Unlocked at Start</div>
                </div>
                <div className="p-3 bg-muted rounded-lg text-center">
                  <div className="text-2xl font-bold">{MISSIONS_DATA.filter(m => m.unlockRequirement).length}</div>
                  <div className="text-sm text-muted-foreground">Require Unlock</div>
                </div>
                <div className="p-3 bg-muted rounded-lg text-center">
                  <div className="text-2xl font-bold">
                    {MISSIONS_DATA.reduce((sum, m) => sum + m.xpReward, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Mission XP</div>
                </div>
              </div>

              {/* Progression Tips */}
              <div className="p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/20">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Mission Progression Tips
                </h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Start with Financial Readiness missions to build your foundation</li>
                  <li>• Featured missions are highly recommended for their comprehensive content</li>
                  <li>• Locked missions unlock automatically when you meet requirements</li>
                  <li>• Strategic missions offer the highest XP rewards (300-400 XP)</li>
                  <li>• Complete all missions in an operation to earn mastery achievements</li>
                  <li>• Some missions can be replayed to refresh your knowledge</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}