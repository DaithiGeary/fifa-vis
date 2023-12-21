import { effect, signal, computed } from "@preact/signals-react";
import { readCsv } from "./dataLoader";

export const attribute = signal("ball_control");
export const rawData = signal({ data: [] });
export const dreamTeam = signal({});
export const countryClub = signal(true);

const cleanValue = (value) => {
  if (!value) return 0;
  return parseInt(
    value
      .replace("$", "")
      .replaceAll(/\.00\b/gm, "")
      .replaceAll(".", "")
  );
};

const convertPlayerDatatoInt = (playerData) => {
  const result = [];
  for (const p of playerData) {
    result.push({
      player: p.player,
      country: p.country,
      height: parseInt(p.height),
      weight: parseInt(p.weight),
      age: parseInt(p.age),
      club: p.club,
      ball_control: parseInt(p.ball_control),
      dribbling: parseInt(p.dribbling),
      slide_tackle: parseInt(p.slide_tackle),
      stand_tackle: parseInt(p.stand_tackle),
      aggression: parseInt(p.aggression),
      reactions: parseInt(p.reactions),
      att_position: parseInt(p.att_position),
      interceptions: parseInt(p.interceptions),
      vision: parseInt(p.vision),
      composure: parseInt(p.composure),
      crossing: parseInt(p.crossing),
      short_pass: parseInt(p.short_pass),
      long_pass: parseInt(p.long_pass),
      acceleration: parseInt(p.acceleration),
      stamina: parseInt(p.stamina),
      strength: parseInt(p.strength),
      balance: parseInt(p.balance),
      sprint_speed: parseInt(p.sprint_speed),
      agility: parseInt(p.agility),
      jumping: parseInt(p.jumping),
      heading: parseInt(p.heading),
      shot_power: parseInt(p.shot_power),
      finishing: parseInt(p.finishing),
      long_shots: parseInt(p.long_shots),
      curve: parseInt(p.curve),
      fk_acc: parseInt(p.fk_acc),
      penalties: parseInt(p.penalties),
      volleys: parseInt(p.volleys),
      gk_positioning: parseInt(p.gk_positioning),
      gk_diving: parseInt(p.gk_diving),
      gk_handling: parseInt(p.gk_handling),
      gk_kicking: parseInt(p.gk_kicking),
      gk_reflexes: parseInt(p.gk_reflexes),
      value: cleanValue(p.value),
    });
  }

  return result;
};

export const loadData = async () => {
  const data = convertPlayerDatatoInt(
    await readCsv("src/assets/player_stats.csv")
  );
  rawData.value = { data };
  return data;
};

export const playerNames = computed(() => {
  const result = [];
  for (const { player } of rawData.value.data) result.push(player);
  return result;
});

export const gkStats = computed(() => {
  const result = [];
  for (const {
    gk_positioning,
    gk_diving,
    gk_handling,
    gk_kicking,
    gk_reflexes,
  } of rawData.value.data) {
    result.push({
      gk_positioning,
      gk_diving,
      gk_handling,
      gk_kicking,
      gk_reflexes,
    });
  }

  return result;
});

const getGoalKeeperScores = computed(() => {
  const result = [];
  for (const p of rawData.value.data) {
    result.push({
      player: p.player,
      positioning: p.gk_positioning,
      kicking: p.gk_kicking,
      handling: p.gk_handling,
      diving: p.gk_diving,
      reflexes: p.gk_reflexes,
      score:
        (p.gk_positioning +
          p.gk_kicking +
          p.gk_handling +
          p.gk_diving +
          p.gk_reflexes) /
        5,
    });
  }

  return result;
});

const getMidfieldScores = computed(() => {
  const result = [];
  for (const p of rawData.value.data) {
    result.push({
      player: p.player,
      ball_control: p.ball_control,
      dribbling: p.dribbling,
      reactions: p.reactions,
      vision: p.vision,
      crossing: p.crossing,
      short_passing: p.short_pass,
      long_passing: p.long_pass,
      acceleration: p.acceleration,
      stamina: p.stamina,
      sprint_speed: p.sprint_speed,
      long_shot: p.long_shots,
      score:
        (p.ball_control +
          p.dribbling +
          p.reactions +
          p.vision +
          p.crossing +
          p.short_pass +
          p.long_pass +
          p.acceleration +
          p.stamina +
          p.sprint_speed +
          p.long_shots) /
        11,
    });
  }

  return result;
});

const getDefenderScores = computed(() => {
  const result = [];
  for (const p of rawData.value.data) {
    result.push({
      player: p.player,
      slide_tackle: p.slide_tackle,
      stand_tackle: p.stand_tackle,
      aggression: p.aggression,
      reactions: p.reactions,
      interceptions: p.interceptions,
      short_passing: p.short_pass,
      acceleration: p.acceleration,
      strength: p.strength,
      sprint_speed: p.sprint_speed,
      jumping: p.jumping,
      heading: p.heading,
      score:
        (p.slide_tackle +
          p.stand_tackle +
          p.aggression +
          p.reactions +
          p.interceptions +
          p.short_pass +
          p.acceleration +
          p.strength +
          p.sprint_speed +
          p.jumping +
          p.heading) /
        11,
    });
  }

  return result;
});

const getAttackerScores = computed(() => {
  const result = [];
  for (const p of rawData.value.data) {
    result.push({
      player: p.player,
      volleys: p.volleys,
      dribbling: p.dribbling,
      attack_position: p.att_position,
      composure: p.composure,
      acceleration: p.acceleration,
      balance: p.balance,
      sprint_speed: p.sprint_speed,
      agility: p.agility,
      curve: p.curve,
      shot_power: p.shot_power,
      finishing: p.finishing,
      score:
        (p.volleys +
          p.dribbling +
          p.att_position +
          p.composure +
          p.acceleration +
          p.balance +
          p.sprint_speed +
          p.agility +
          p.curve +
          p.shot_power +
          p.finishing) /
        11,
    });
  }

  return result;
});

const chooseBestPositionBasedOnScores = computed(() => {
  const result = [];
  const goalKeeperScores = getGoalKeeperScores.value;
  const midfieldScores = getMidfieldScores.value;
  const defenderScores = getDefenderScores.value;
  const attackerScores = getAttackerScores.value;

  for (const p of rawData.value.data) {
    const goalKeeperScore = goalKeeperScores.find(
      (gk) => gk.player === p.player
    );
    const midfieldScore = midfieldScores.find((mid) => mid.player === p.player);
    const defenderScore = defenderScores.find((def) => def.player === p.player);
    const attackerScore = attackerScores.find((att) => att.player === p.player);

    const bestScore = Math.max(
      goalKeeperScore.score,
      midfieldScore.score,
      defenderScore.score,
      attackerScore.score
    );
    let bestPosition = "";
    if (bestScore === goalKeeperScore.score) {
      bestPosition = "GK";
    } else if (bestScore === midfieldScore.score) {
      bestPosition = "MID";
    } else if (bestScore === defenderScore.score) {
      bestPosition = "DEF";
    } else if (bestScore === attackerScore.score) {
      bestPosition = "ATT";
    }

    result.push({
      ...p,
      position: bestPosition,
      score: bestScore,
      att_score: attackerScore.score,
      mid_score: midfieldScore.score,
      def_score: defenderScore.score,
      gk_score: goalKeeperScore.score,
      ovr_score:
        (attackerScore.score +
          midfieldScore.score +
          defenderScore.score +
          goalKeeperScore.score) /
        4,
    });
  }

  return result;
});

//Pick best 4 unique defenders, 4 midfielders, 2 attackers, 1 goalkeeper
export const makeBest442Team = computed(() => {
  const result = {};

  const bestPositions = chooseBestPositionBasedOnScores.value;
  const goalKeepers = bestPositions
    .filter((p) => p.position === "GK")
    .sort((a, b) => b.score - a.score);
  const defenders = bestPositions
    .filter((p) => p.position === "DEF")
    .sort((a, b) => b.score - a.score);
  const midfielders = bestPositions
    .filter((p) => p.position === "MID")
    .sort((a, b) => b.score - a.score);
  const attackers = bestPositions
    .filter((p) => p.position === "ATT")
    .sort((a, b) => b.score - a.score);

  result.goalKeeper = goalKeepers[0];
  result.defenders = defenders.slice(0, 4);
  result.midfielders = midfielders.slice(0, 4);
  result.attackers = attackers.slice(0, 2);

  return result;
});

export const makeBest442TeamGivenAttribute = computed(() => {
  const result = {};

  const bestPositions = chooseBestPositionBasedOnScores.value;
  const goalKeepers = bestPositions
    .filter((p) => p.position === "GK")
    .sort((a, b) => b[attribute.value] - a[attribute.value]);
  const defenders = bestPositions
    .filter((p) => p.position === "DEF")
    .sort((a, b) => b[attribute.value] - a[attribute.value]);
  const midfielders = bestPositions
    .filter((p) => p.position === "MID")
    .sort((a, b) => b[attribute.value] - a[attribute.value]);
  const attackers = bestPositions
    .filter((p) => p.position === "ATT")
    .sort((a, b) => b[attribute.value] - a[attribute.value]);

  result.goalKeeper = goalKeepers[0];
  result.defenders = defenders.slice(0, 4);
  result.midfielders = midfielders.slice(0, 4);
  result.attackers = attackers.slice(0, 2);

  return result;
});

effect(() => (dreamTeam.value = makeBest442TeamGivenAttribute.value));
