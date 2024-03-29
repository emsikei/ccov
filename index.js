#!/usr/bin/env node
require('dotenv').config();
const args = require("yargs")
  .scriptName("ccov")
  .usage("Usage: $0 -a <amount> -b <currency> -t <currency>")
  .example(
    "$0 -a 1 -b USD -t EUR",
    "Returns the amount of dollars in euro."
  )
  .option("l", {
    alias: "list",
    describe: "List of currency codes",
  })
  .option("a", {
    alias: "amount",
    describe: "Amount",
    type: "number",
  })
  .option("b", {
    alias: "base",
    describe: "Base currency",
    type: "string",
  })
  .option("t", {
    alias: "target",
    describe: "Target currency list",
    type: "string",
  })
  .describe("help", "Show help.")
  .describe("version", "Show version number.").argv;

const axios = require("axios");

const start = async () => {
  if (args.l && !(args.a && args.b && args.t)) {
    console.log("Currency codes list: ", 'https://gist.github.com/emsikei/5783f0dad04afb0001f7cfc5528b4323');
  } else if (!args.l && args.a && args.b && args.t) {
    const amount = args.a;
    const base = args.b;
    const target = args.t.split(",");

    const { data } = await axios.get(
      `http://api.exchangerate.host/convert?access_key=${process.env.EXCHANGE_RATE_ACCESS_KEY}&amount=${amount}&from=${base}&to=${target}`
    );

    console.log(`${amount} ${base} = ${data.result.toFixed(2)} ${target}`)
  } else {
    console.log('Amount, base currency and target currency list are required');
  }
};

start();
