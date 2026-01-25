// Combat and competitive game models

export interface CombatAction {
  type: 'attack' | 'defend' | 'special' | 'heal';
  damage?: number;
  accuracy: number;
  cooldown: number;
}

export interface CombatStats {
  health: number;
  mana: number;
  stamina: number;
  attack: number;
  defense: number;
  speed: number;
  criticalChance: number;
}

export interface BattleState {
  playerStats: CombatStats;
  enemyStats: CombatStats;
  round: number;
  playerTurn: boolean;
  battleLog: string[];
  isGameOver: boolean;
  winner?: 'player' | 'enemy';
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  manaCost: number;
  cooldown: number;
  damage: number;
  accuracy: number;
  effectType: 'damage' | 'heal' | 'buff' | 'debuff';
}

export interface Character {
  id: string;
  name: string;
  level: number;
  experience: number;
  stats: CombatStats;
  skills: Skill[];
  equipment: Equipment[];
}

export interface Equipment {
  id: string;
  name: string;
  type: 'weapon' | 'armor' | 'accessory';
  statBonus: Partial<CombatStats>;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
}
