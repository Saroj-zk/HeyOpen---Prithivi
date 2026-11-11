export { default as StakePage } from './StakePage';
export { default as TokenPage } from './TokenPage';
export { default as EnterprisePage } from './EnterprisePage';

/* Each page set its own <head> through this site's PageMeta, which has
   been stripped out. The values are here so the host can feed them to
   whatever it uses, and the paths are the ones the pages were served
   from. */
export const PAGE_META = {
  StakePage: {
    title: 'Stake $OPEN: Earn Yield and Mint $HEY | Hey Open',
    description: '$OPEN is the capital asset of Hey Open. Stake it for a fixed floor and a target well above it, and to mint $HEY, which pays out compute credits when you stake it.',
    path: '/stake',
  },
  TokenPage: {
    title: 'Tokenomics — $OPEN Revenue Flywheel & Utility | Hey Open',
    description: '$OPEN is rewarded for real AI usage, not printed out of thin air. Real protocol revenue buys back tokens, rewards compute providers, and burns the surplus on-chain.',
    path: '/token',
  },
  EnterprisePage: {
    title: 'The economics behind $OPEN | Hey Open',
    description: 'Hey Open powers Custom branded AI products for enterprises, with compute protection designed to keep costs predictable. As the business grows, its revenue connects real AI usage to $OPEN buybacks and burns.',
    path: '/enterprise',
  },
};
