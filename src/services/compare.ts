// Compare the base stats of two Pokemon

export type StatWinner = 'left' | 'right' | 'tie';

export interface BaseStat {
  base_stat: number;
  stat: { name: string };
}

export interface StatComparison {
  name: string;
  left: number;
  right: number;
  winner: StatWinner;
}

export function getWinner(left: number, right: number): StatWinner {
  if (left > right) return 'left';
  if (right > left) return 'right';
  return 'tie';
}

/**
 * For each stat of the left Pokemon, find the same stat on the right
 * and say who has the higher value.
 */
export function compareStats(left: BaseStat[], right: BaseStat[]): StatComparison[] {
  return left.map((leftStat) => {
    const rightStat = right.find((s) => s.stat.name === leftStat.stat.name);
    const rightValue = rightStat ? rightStat.base_stat : 0;
    return {
      name: leftStat.stat.name,
      left: leftStat.base_stat,
      right: rightValue,
      winner: getWinner(leftStat.base_stat, rightValue),
    };
  });
}
