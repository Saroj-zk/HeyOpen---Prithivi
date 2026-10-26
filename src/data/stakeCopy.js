/**
 * Three versions of the staking page's copy.
 *
 * Not three rewordings of one argument. Each takes a different position on
 * why a reader should care, because that is the thing worth deciding before
 * anybody polishes a sentence:
 *
 *   A, Statement     the mechanics, stated precisely and left to speak.
 *                    For a reader who distrusts being sold to.
 *   B, Idle capital  the cost of doing nothing, said first and plainly.
 *                    For a reader who already holds and has not moved.
 *   C, The claim     compute is the scarce asset and this is the claim on
 *                    it. For a reader deciding whether the thing is real.
 *
 * Every version carries the same facts and the same restraint: the floor is
 * fixed and said to be fixed, the band is a target and never called
 * guaranteed, and nothing names where the return comes from.
 */

export const VERSIONS = [
  {
    id: 'A',
    name: 'Statement',
    note: 'Precise and understated. Reads like the account it describes.',

    hero: {
      eyebrow: 'The capital asset',
      title: 'Stake $OPEN.',
      lede:
        '$OPEN is the capital asset of Hey Open. Staking it pays a floor that is owed to you and aims a long way above it, and it is the only thing that mints $HEY, which pays you in compute.',
    },

    how: [
      {
        title: 'Get $OPEN',
        body: 'An ERC-20, with a fixed supply and no inflation switch. Buy it wherever it trades.',
      },
      {
        title: 'Stake it',
        body: 'Everything you stake earns from the epoch it lands in. 6.00% is the floor, 40% to 50% is the aim.',
      },
      {
        title: 'Mint $HEY',
        body: 'Staked $OPEN mints $HEY, and nothing else does. Stake the $HEY and it pays you in compute.',
      },
    ],

    yield: {
      eyebrow: 'The yield',
      title: 'A 6.00% floor, and a target well above it.',
      lede:
        'The floor is a rate the protocol sets and pays whatever happens. The target is the figure the treasury is run to, all in, with the floor as its worst case rather than a separate payment beside it.',
      floorLabel: 'However the year goes',
      floorBody:
        'Set by the protocol and paid on schedule. It does not wait on anything going well, and nothing that happens later takes it back.',
      targetLabel: 'When the year goes to plan',
      targetBody:
        'All in, with the 6.00% floor sitting inside it rather than beside it. The treasury puts the staked supply to work and stakers take a share of what comes back, reported once a period has closed rather than promised before it starts.',
      workedNote:
        'And 10,600 if the target is missed entirely, because the floor is paid either way. Both lines are paid in value, not in credit. $HEY is the credit side and is minted separately.',
      proofEyebrow: 'Why you can check it',
    },

    pro: {
      eyebrow: 'What the stake unlocks',
      title: 'Stake 100 $OPEN and the app stops being a subscription.',
      lede:
        'Everything the paid tier gets you, for as long as the stake is there. The stake keeps earning the whole time, so the access costs you nothing you were not already holding.',
      note: 'Unstake and it goes back to being a subscription. Nothing is lost in between.',
    },

    stakes: {
      eyebrow: 'Two tokens',
      title: 'Two things to stake, paid in two different ways.',
      lede:
        '$OPEN is the capital asset and $HEY is what it mints. Staking the first pays you in value. Staking the second pays you in the thing the network actually makes, which is compute.',
      openBody:
        'The asset you buy and hold. Staking it pays a fixed floor you cannot drop below and aims well above it, in $OPEN rather than in anything you have to spend here.',
      heyBody:
        'Minted against staked $OPEN and held or sold like anything else. Staking it pays out credit for the catalogue, which is the network paying you in the thing it makes.',
      foot:
        '$HEY is minted against staked $OPEN and nothing else mints it. Burning $HEY releases the stake behind it.',
    },

    supply: {
      title: 'Bought back and burned, not printed.',
      body:
        'A share of what the product earns buys $OPEN on the open market, rewards the providers doing the work, and burns what the network does not need. Less supply, verifiably, rather than more.',
    },

    close: {
      title: 'Hold it, stake it, spend what it makes.',
    },
  },

  {
    id: 'B',
    name: 'Idle capital',
    note: 'Leads with the cost of doing nothing. Direct, and slightly pointed.',

    hero: {
      eyebrow: 'Put it to work',
      title: 'Your $OPEN is sitting still.',
      lede:
        'Staked, it earns a floor of 6.00% that cannot be taken back, aims at 40% to 50%, covers your own use of the app at a hundred, and mints the token that pays for compute. Held in a wallet, it does none of that.',
    },

    how: [
      {
        title: 'Buy it',
        body: 'An ERC-20 with a fixed supply and no inflation switch. Wherever it already trades.',
      },
      {
        title: 'Stake it',
        body: 'One transaction, and it starts earning in the epoch it lands in. Nothing is sold and nothing leaves your control.',
      },
      {
        title: 'Spend what it makes',
        body: 'Yield in $OPEN, compute in the $HEY it mints, and the app thrown in once a hundred is staked.',
      },
    ],

    yield: {
      eyebrow: 'What it pays',
      title: '6.00% you cannot lose, and a long way further to go.',
      lede:
        'Two things happen the moment you stake. The floor starts paying and never stops. The target is the figure the book is run to on everything staked, all in, and that floor is the worst it can do.',
      floorLabel: 'The worst case',
      floorBody:
        'This is what you get if nothing goes right all year. It is written into the staking contract rather than decided each period, and nothing that happens later reaches back for it.',
      targetLabel: 'The case worth staking for',
      targetBody:
        'What the treasury is managing to, reported once a period closes rather than promised before it opens. The floor is inside this figure, not added to it, so a flat year still pays the 6.00% in full.',
      workedNote:
        'And 10,600 if the target is missed completely, because the floor does not depend on it. Both lines pay in value. Compute is the $HEY side, and that is minted separately.',
      proofEyebrow: 'Before you take our word for it',
    },

    pro: {
      eyebrow: 'The hundred',
      title: 'A hundred staked, and you stop paying for the app.',
      lede:
        'Not a discount and not a trial. The subscription simply stops being something you pay for, for as long as the stake is there, and the stake carries on earning the whole time.',
      note: 'Unstake whenever you like and it goes back to being a subscription. Nothing is forfeited.',
    },

    stakes: {
      eyebrow: 'Two tokens',
      title: 'One asset, two ways to be paid.',
      lede:
        'Stake $OPEN and the network pays you in value. Stake the $HEY that your stake mints and it pays you in compute instead. Most people end up doing both.',
      openBody:
        'What you buy and hold. Staking it pays a floor you cannot drop below and aims a long way past it, in $OPEN, with nothing you have to spend here to collect it.',
      heyBody:
        'What your stake mints. Stake it and the network pays you in inference instead of money, on any model in the catalogue. Sell it instead if you would rather have the money.',
      foot:
        'Only staked $OPEN mints $HEY. Burn the $HEY and the stake behind it comes back.',
    },

    supply: {
      title: 'Every month there is less of it.',
      body:
        'Revenue buys $OPEN on the open market, the providers doing the work are paid first, and what the network does not need is burned on chain. The supply has one direction and it is down.',
    },

    close: {
      title: 'Nothing you hold should sit still.',
    },
  },

  {
    id: 'C',
    name: 'The claim',
    note: 'Thesis first. Compute is the scarce asset and this is the claim on it.',

    hero: {
      eyebrow: 'The capital asset of private AI',
      title: 'The asset behind the compute.',
      lede:
        'Every model on this network runs on hardware somebody has to pay for, and $OPEN is the claim on that capacity. Stake it for a 6.00% floor with the book run to 40% to 50%, and mint $HEY, which turns the claim into the inference itself.',
    },

    how: [
      {
        title: 'Acquire it',
        body: 'An ERC-20 with a fixed supply. The supply does not grow. What the network does with it is what changes.',
      },
      {
        title: 'Commit it',
        body: 'Capital committed to the network earns a floor of 6.00%, from the epoch it lands in, with the book run to 40% to 50%.',
      },
      {
        title: 'Convert it',
        body: 'Staked $OPEN mints $HEY, which is capacity rather than currency: a fixed amount of inference a day that renews.',
      },
    ],

    yield: {
      eyebrow: 'Why there is a yield at all',
      title: 'Capital that does something earns something.',
      lede:
        'The floor is paid by the protocol and is not conditional on anything. Above it, committed capital is put to work and stakers take the share that comes back, which is why that figure is a band rather than a rate.',
      floorLabel: 'Unconditional',
      floorBody:
        'A protocol rate, set in advance and paid on schedule. It does not depend on performance, on a decision, or on anyone agreeing it was a good period.',
      targetLabel: 'Managed',
      targetBody:
        'The range the book is run to, all in, with the floor as the worst case inside it. Declared at the close of a period against what was actually returned, rather than asserted at the start of one.',
      workedNote:
        'And 10,600 if the target returns nothing, since the floor is unconditional. Both lines settle in value. Inference is what $HEY pays, and $HEY is minted separately.',
      proofEyebrow: 'What is verifiable',
    },

    pro: {
      eyebrow: 'The threshold',
      title: 'A hundred staked covers your own use of the network.',
      lede:
        'Past that, the subscription stops being a cost and becomes a consequence of the position you already hold. The capital keeps earning while it does the covering.',
      note: 'The threshold is a position, not a payment. Unwind it and the subscription returns.',
    },

    stakes: {
      eyebrow: 'Two tokens',
      title: 'One token for the capital, one for the compute.',
      lede:
        '$OPEN is the claim on the network and $HEY is the capacity that claim can be converted into. Staking the first returns value. Staking the second returns inference.',
      openBody:
        'The capital asset. Committed to the network it earns a floor that is not conditional and aims well past it, settled in $OPEN rather than in anything redeemable only here.',
      heyBody:
        'Capacity, minted only against committed capital. Staked, it returns a fixed amount of inference a day across the catalogue. Transferable, so the capacity can go to whoever values it most.',
      foot:
        'All $HEY originates in staked $OPEN. Burning it returns the capital underneath.',
    },

    supply: {
      title: 'Fixed supply, falling float.',
      body:
        'Revenue buys $OPEN on the open market, compensates the providers carrying the work, and burns the remainder on chain. Supply was fixed at the start and has moved one way since.',
    },

    close: {
      title: 'Own the capacity, not the invoice.',
    },
  },
];
