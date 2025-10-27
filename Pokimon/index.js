import axios from "axios";
import promptSync from "prompt-sync";

const prompt = promptSync();

const userHP = 300;
const pcHP = 300;

async function findPokemon(name) {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
    const pokemon = response.data;

    const moves = pokemon.moves
      .sort(() => 0.5 - Math.random())
      .slice(0, 10);

    const pokemonmoves = [];

    for (let move of moves) {
      try {
        const moveData = await axios.get(move.move.url);
        const data = moveData.data;
        if (data.power && data.accuracy) {
          pokemonmoves.push({
            name: data.name,
            power: data.power,
            accuracy: data.accuracy,
          });
        }
      } catch (e) {}
      if (pokemonmoves.length >= 6) break;
    }

    return {
      name: pokemon.name,
      moves: pokemonmoves,
    };
  } catch (error) {
    console.log("we could not find ur Pokémon");
    return null;
  }
}

function attack(attacker, defender, move) {
  console.log(`\n${attacker.name} uses ${move.name.toUpperCase()}`);

  const chanceToHit = Math.random() * 100;
  if (chanceToHit > move.accuracy) {
    console.log(`${attacker.name}'s attack missed`);
    return 0;
  }

  const damage = Math.floor(move.power - Math.random() * 10);
  console.log(` ${damage} damage`);
  return damage;
}

async function MainGame() {
  console.log(" Pokemon  ");
  const playerName = prompt(" your Pokémon: ");
  const player = await findPokemon(playerName);

 
  const botList = ["pikachu", "charmander", "squirtle", "eevee"];
  const botName = botList[Math.floor(Math.random() * botList.length)];
  const bot = await findPokemon(botName);

  console.log(`\nThe computer chose ${bot.name}!\n`);

  let userhp = userHP;
  let pchp = pcHP;

  while (userhp > 0 && pchp > 0) {
    console.log("\nYour moves:");
    player.moves.forEach((m, i) => {
      console.log(`${i + 1}. ${m.name} (power of move: ${m.power}, accuracy: ${m.accuracy}%)`);
    });

    const choice = parseInt(prompt("Choose your move: "));
    const playerMove = player.moves[choice - 1];
    if (!playerMove) {
      console.log("Invalid choice!");
      continue;
    }

    const pcdamage = attack(player, bot, playerMove);
    pchp -=  pcdamage;
    if (pchp <= 0) break;

    const botMove = bot.moves[Math.floor(Math.random() * bot.moves.length)];
    const playerdamage = attack(bot, player, botMove);
    userhp -= playerdamage;

    console.log(`\nYour HP: ${userhp > 0 ? userhp : 0}`);
    console.log(`pc HP: ${pchp > 0 ? pchp : 0}`);
  }

  if (userhp <= 0 && pchp <= 0) {
    console.log("\n you both lose ");
  } else if (userhp <= 0) {
    console.log("\n you lose");
  } else {
    console.log("\nYou won ");
  }
}

MainGame();
