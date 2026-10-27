/**
 * Three versions of the staking page's copy.
 *
 * Not three rewordings of one argument. Each opens on a different hook:
 *
 *   A, The guarantee   leads on the word the page is allowed to use.
 *                      6% guaranteed, and we are not stopping there.
 *   B, It pays for you the loop nobody else can offer: the tokens you
 *                      hold end up paying for the AI you use.
 *   C, Don't sell it   short, direct, for a holder deciding what to do
 *                      with a position they already have.
 *   D, Owed and aimed  the tightest of the four, and the one the page
 *      at               runs on. It leads on the distinction the whole
 *                      page exists to make: one of these two numbers is
 *                      owed to you and the other is aimed at, and a
 *                      reader who takes nothing else away should take
 *                      that.
 *
 * Guaranteed is used, deliberately, and only ever about the 6.00%. That
 * figure is a protocol rate written into the staking contract, so calling it
 * guaranteed is a statement of fact and is the strongest honest word on the
 * page. The 40% to 50% is a target in all three versions and is never called
 * guaranteed, promised or expected, and none of the three says where it comes
 * from. Contractions are used freely: the brief asked for a warmer tone and
 * the page was reading like a prospectus.
 */

export const VERSIONS = [
  {
    id: 'A',
    name: 'The guarantee',
    note: 'Leads on the one word the page is allowed to use. Confident, clean.',

    hero: {
      eyebrow: 'Staking',
      title: "6% guaranteed. And we're not stopping there.",
      lede:
        "Stake $OPEN and 6% is the floor, written into the contract. Above it we run the book to 40% to 50%. Your stake never leaves your wallet, and it mints $HEY, which pays for your compute.",
    },

    howTitle: 'Three moves. Then it earns.',
    how: [
      {
        title: 'Get $OPEN',
        body: 'Fixed supply, no inflation switch. Buy it wherever it already trades.',
      },
      {
        title: 'Stake it',
        body: "One transaction, and it's earning in the same epoch. Nothing sold, nothing locked away.",
      },
      {
        title: 'Mint $HEY',
        body: 'Your stake mints $HEY, and nothing else does. Stake that, and your compute is paid for too.',
      },
    ],

    yield: {
      eyebrow: 'The yield',
      title: "A floor you can't fall through.",
      lede:
        "The 6% is guaranteed, in the contract, paid whatever kind of year it's been. The 40% to 50% is the band we run the book to. One is a promise and one is a target, and you should know which is which.",
      floorLabel: 'Guaranteed',
      floorBody:
        "Written into the staking contract and paid on schedule. It doesn't wait on a good year, a good quarter, or anybody's decision.",
      targetLabel: "What we're aiming at",
      targetBody:
        'The range we manage to, all in, with the 6% sitting inside it as the worst case. Reported after a period closes, never promised before it opens.',
      workedNote:
        "Miss the target completely and you still hold 10,600, because the floor doesn't depend on it. Both lines pay in value. Compute is what $HEY pays, and that's minted separately.",
      proofEyebrow: 'Check it yourself',
    },

    pro: {
      eyebrow: 'The hundred',
      title: 'Stake 100 and stop paying for AI.',
      lede:
        'Every model, unlimited prompts, the whole app. Free for as long as the stake is there, and the stake keeps earning the entire time it covers you.',
      note: "Unstake whenever you like. It just goes back to being a subscription.",
    },

    stakes: {
      eyebrow: 'Two tokens',
      title: 'One earns you money. One earns you compute.',
      lede:
        "$OPEN is what you buy and stake. $HEY is what your stake mints. Stake the first and you're paid in value. Stake the second and you're paid in inference.",
      openBody:
        "The one you hold. Staked, it pays a guaranteed 6% floor and aims a long way past it, in $OPEN, with nothing you have to spend here to collect it.",
      heyBody:
        "The one your stake makes. Staked, it pays out compute every day, across the whole catalogue. Or sell it, if you'd rather have the money.",
      foot: 'Only staked $OPEN mints $HEY. Burn the $HEY and your stake comes back.',
    },

    supply: {
      title: 'Less of it every month.',
      body:
        'Revenue buys $OPEN on the open market, pays the providers doing the work, and burns the rest on chain. The supply only moves one way.',
    },

    close: {
      title: 'Put it to work.',
    },
  },

  {
    id: 'B',
    name: 'It pays for you',
    note: 'The loop nobody else can offer: your tokens end up paying for your AI.',

    hero: {
      eyebrow: 'Staking',
      title: 'Let your tokens pay for your AI.',
      lede:
        'Stake $OPEN and it earns 6%, guaranteed. Stake 100 and the app costs you nothing. Mint $HEY and your compute is covered as well. You stop paying, and the tokens start.',
    },

    howTitle: 'Buy, stake, stop paying.',
    how: [
      {
        title: 'Buy $OPEN',
        body: 'Fixed supply, no inflation switch. Wherever it already trades.',
      },
      {
        title: 'Stake it',
        body: "One transaction, earning in the same epoch. Nothing sold, and it never leaves your wallet.",
      },
      {
        title: 'Let it pay',
        body: '6% guaranteed in $OPEN, compute from the $HEY it mints, and the app free once a hundred is staked.',
      },
    ],

    yield: {
      eyebrow: 'What it pays',
      title: '6% guaranteed. 40 to 50 is the plan.',
      lede:
        "The 6% is in the contract, so it turns up whatever kind of year it's been. The 40% to 50% is the band we run the book to. We'd rather tell you which is which than blur the two together.",
      floorLabel: 'Guaranteed',
      floorBody:
        "In the contract and paid on schedule. It doesn't need a good year to show up, and nothing that happens later comes back for it.",
      targetLabel: 'The plan',
      targetBody:
        "What we're managing to, all in, with the 6% inside it as the worst case. Reported once a period closes, never promised before one starts.",
      workedNote:
        "Even a complete miss leaves you holding 10,600, because the floor isn't conditional. Both lines pay in value. Compute comes from $HEY, which is minted separately.",
      proofEyebrow: "Don't take our word for it",
    },

    pro: {
      eyebrow: 'A hundred',
      title: 'A hundred staked, and the app is free.',
      lede:
        "Not a trial and not a discount. Every model and unlimited prompts, for as long as you're staked, with the stake still earning the whole time.",
      note: 'Unstake whenever you want. It simply goes back to being a subscription.',
    },

    stakes: {
      eyebrow: 'Two tokens',
      title: 'One pays you money. One pays you compute.',
      lede:
        '$OPEN is what you hold. $HEY is what your stake mints. Between them you get paid twice, in two different currencies, for the same position.',
      openBody:
        "What you buy. Staked, it pays 6% guaranteed and aims well past it, in $OPEN, with nothing you have to spend here to collect it.",
      heyBody:
        "What your stake mints. Staked, it pays out compute every day on any model in the catalogue. Sell it instead, if you'd rather have the money.",
      foot: 'Only staked $OPEN mints $HEY. Burn it and your stake comes back.',
    },

    supply: {
      title: 'Less of it every month.',
      body:
        'Revenue buys $OPEN on the open market, pays the providers carrying the work, and burns what is left on chain. Supply has one direction and it is down.',
    },

    close: {
      title: 'Stop paying for AI.',
    },
  },

  {
    id: 'C',
    name: "Don't sell it",
    note: 'Short and direct, for a holder deciding what to do with a position.',

    hero: {
      eyebrow: 'Staking',
      title: "Don't sell it. Stake it.",
      lede:
        '6% guaranteed. 40% to 50% the target. Plus $HEY, which turns the stake into compute. Your $OPEN stays yours the whole way through.',
    },

    howTitle: 'Three moves, and it stays yours.',
    how: [
      {
        title: 'Get it',
        body: 'Fixed supply. No inflation switch. Buy it wherever it trades.',
      },
      {
        title: 'Stake it',
        body: 'One transaction. Earning the same epoch. Still yours.',
      },
      {
        title: 'Use it',
        body: '6% guaranteed, compute from the $HEY it mints, and the whole app free at a hundred.',
      },
    ],

    yield: {
      eyebrow: 'The numbers',
      title: '6% floor. 40 to 50 target.',
      lede:
        "The floor is contractual and does not move. The target is the band we run the book to. Two different kinds of number, kept apart so you always know which one you're owed.",
      floorLabel: 'Owed to you',
      floorBody:
        "Written in, paid on schedule, and not conditional on a good year or anybody's judgement.",
      targetLabel: 'Aimed at',
      targetBody:
        'The range we manage to, all in. The 6% is the worst case inside it. Reported after the period, never promised before it.',
      workedNote:
        'Worst case you hold 10,600, because the floor stands on its own. Both lines pay in value. $HEY is the compute side, and it is minted separately.',
      proofEyebrow: 'Verify it',
    },

    pro: {
      eyebrow: '100',
      title: 'Stake 100. Use everything.',
      lede:
        "Every model on the network, unlimited, for as long as you're staked. The stake carries on earning while it does it.",
      note: 'Unstake any time. The subscription just comes back.',
    },

    stakes: {
      eyebrow: 'Two tokens',
      title: 'Paid twice, in two currencies.',
      lede:
        '$OPEN pays you in value. $HEY, which only your stake can mint, pays you in compute. Same position, two returns.',
      openBody:
        'The one you buy. Staked, it pays 6% guaranteed and aims a long way past it, settled in $OPEN rather than in anything you can only spend here.',
      heyBody:
        'The one your stake makes. Staked, it pays out compute daily across the catalogue. Transferable, so it can go to whoever wants it more.',
      foot: 'All $HEY comes from staked $OPEN. Burn it and the stake underneath is released.',
    },

    supply: {
      title: 'Supply only goes down.',
      body:
        'Revenue buys $OPEN on the market, pays the providers doing the work, and burns the remainder on chain. Fixed at the start, smaller every month since.',
    },

    close: {
      title: 'Your move.',
    },
  },

  {
    id: 'D',
    name: 'Owed and aimed at',
    note: 'Tightest of the four. Leads on the distinction the page exists to make.',

    hero: {
      eyebrow: 'Staking',
      title: '6% is the floor. We aim a long way higher.',
      lede:
        "Stake $OPEN and the contract owes you 6%, whatever kind of year it has been. Above that we run the book toward 40% to 50%, all in. Your stake never leaves your wallet, and it mints $HEY, which pays for your compute.",
    },

    howTitle: 'Three moves, then it works for you.',
    how: [
      {
        title: 'Get $OPEN',
        body: 'Fixed supply, no inflation switch. Buy it wherever it already trades.',
      },
      {
        title: 'Stake it',
        body: 'One transaction, earning the same epoch. Nothing sold, nothing put beyond your reach.',
      },
      {
        title: 'Mint $HEY',
        body: 'Only a stake mints it. Stake the $HEY and your compute is paid for too.',
      },
    ],

    yield: {
      eyebrow: 'The yield',
      title: 'One number is owed. One is aimed at.',
      lede:
        'The 6% sits in the staking contract and pays on schedule. The 40% to 50% is the band we run the book to, all in. Telling you which is which is the whole job of this page.',
      floorLabel: 'Owed to you',
      floorBody:
        "Written into the contract and paid on schedule. It does not wait on a good year, a good quarter, or anybody's decision.",
      targetLabel: 'Aimed at',
      targetBody:
        'The range we manage to, all in, with the 6% sitting inside it as the worst case. Reported after a period closes, never promised before it opens.',
      workedNote:
        'Miss the band completely and the floor still pays in full. That is what makes it a floor rather than a forecast.',
      proofEyebrow: 'Check it yourself',
    },

    pro: {
      eyebrow: 'The hundred',
      title: 'Stake a hundred. Stop paying for AI.',
      lede:
        'Every model, unlimited prompts, the whole app, free for as long as the stake is there. The stake keeps earning the entire time it covers you.',
      note: 'Unstake whenever you like. It just goes back to being a subscription.',
    },

    stakes: {
      eyebrow: 'Two tokens',
      title: 'One pays in money. One pays in compute.',
      lede:
        '$OPEN is what you buy and stake. $HEY is what the stake mints. Same position, two returns, in two different currencies.',
      openBody:
        'The one you hold. Staked, it pays the 6% floor and aims a long way past it, in $OPEN, with nothing you have to spend here to collect it.',
      heyBody:
        'The one your stake makes. Staked, it pays out compute every day across the whole catalogue. Or sell it, if you would rather have the money.',
      foot: 'Only staked $OPEN mints $HEY. Burn the $HEY and your stake comes back.',
    },

    supply: {
      title: 'Less of it every month.',
      body:
        'Revenue buys $OPEN on the open market, pays the providers doing the work, and burns the rest on chain. Supply has one direction.',
    },

    close: {
      title: 'Put it to work.',
    },
  },
];
