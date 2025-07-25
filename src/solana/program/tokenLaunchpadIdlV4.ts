export const IDL_V4 = {
  version: '0.1.0',
  name: 'token_launchpad',
  instructions: [
    {
      name: 'tokenMint',
      accounts: [
        {
          name: 'sender',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'backendAuthority',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'curveAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'mint',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'mintMetadata',
          isMut: true,
          isSigner: false,
          docs: [
            'Type validating that the account is owned by the System Program = uninitialized',
            'seeds should ensure that the address is correct',
          ],
        },
        {
          name: 'curveTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'configAccount',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'mplTokenMetadata',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'mintParams',
          type: {
            defined: 'TokenMintParams',
          },
        },
      ],
    },
    {
      name: 'buy',
      accounts: [
        {
          name: 'sender',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'senderTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'curveAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'curveTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'dexFee',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'helioFee',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'mint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'configAccount',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'data',
          type: {
            defined: 'TradeParams',
          },
        },
      ],
    },
    {
      name: 'buyWithBeAuthority',
      accounts: [
        {
          name: 'backendAuthority',
          isMut: false,
          isSigner: true,
          docs: ['BE Authority'],
        },
        {
          name: 'sender',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'senderTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'curveAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'curveTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'dexFee',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'helioFee',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'mint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'configAccount',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'data',
          type: {
            defined: 'TradeParams',
          },
        },
      ],
    },
    {
      name: 'sell',
      accounts: [
        {
          name: 'sender',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'senderTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'curveAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'curveTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'dexFee',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'helioFee',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'mint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'configAccount',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'data',
          type: {
            defined: 'TradeParams',
          },
        },
      ],
    },
    {
      name: 'migrateFunds',
      accounts: [
        {
          name: 'backendAuthority',
          isMut: false,
          isSigner: true,
          docs: ['BE Authority'],
        },
        {
          name: 'migrationAuthority',
          isMut: true,
          isSigner: true,
          docs: [
            'Migration Authority',
            'Owner and Payer over Token Accounts, needs to be mutable',
          ],
        },
        {
          name: 'curveAccount',
          isMut: true,
          isSigner: false,
          docs: [
            'Curve Account',
            'The account is closed after this instruction',
          ],
        },
        {
          name: 'curveTokenAccount',
          isMut: true,
          isSigner: false,
          docs: [
            'Curve Token Account',
            'The account is closed after this instruction',
          ],
        },
        {
          name: 'migrationAuthorityTokenAccount',
          isMut: true,
          isSigner: false,
          docs: ['Authority token Account', 'Init on demand'],
        },
        {
          name: 'mint',
          isMut: true,
          isSigner: false,
          docs: [
            'InterfaceAccount: checks program ownership + deserialize into Mint',
          ],
        },
        {
          name: 'dexFeeAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'helioFeeAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'configAccount',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'configInit',
      accounts: [
        {
          name: 'configAuthority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'configAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'data',
          type: {
            defined: 'ConfigParams',
          },
        },
      ],
    },
    {
      name: 'configUpdate',
      accounts: [
        {
          name: 'configAuthority',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'configAccount',
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'data',
          type: {
            defined: 'ConfigParams',
          },
        },
      ],
    },
  ],
  accounts: [
    {
      name: 'ConfigAccount',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'migrationAuthority',
            type: 'publicKey',
          },
          {
            name: 'backendAuthority',
            type: 'publicKey',
          },
          {
            name: 'configAuthority',
            type: 'publicKey',
          },
          {
            name: 'helioFee',
            type: 'publicKey',
          },
          {
            name: 'dexFee',
            type: 'publicKey',
          },
          {
            name: 'feeBps',
            type: 'u16',
          },
          {
            name: 'dexFeeShare',
            type: 'u8',
          },
          {
            name: 'migrationFee',
            type: 'u64',
          },
          {
            name: 'linearCurveMcapThreshold',
            type: 'u64',
          },
          {
            name: 'marketcapCurrency',
            type: {
              defined: 'Currency',
            },
          },
          {
            name: 'minSupportedDecimalPlaces',
            type: 'u8',
          },
          {
            name: 'maxSupportedDecimalPlaces',
            type: 'u8',
          },
          {
            name: 'minSupportedTokenSupply',
            type: 'u64',
          },
          {
            name: 'maxSupportedTokenSupply',
            type: 'u64',
          },
          {
            name: 'bump',
            type: 'u8',
          },
          {
            name: 'coefB',
            type: 'u32',
          },
          {
            name: 'constantProductV1McapThreshold',
            type: 'u64',
          },
          {
            name: 'constantProductV2McapThreshold',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'CurveAccount',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'totalSupply',
            type: 'u64',
          },
          {
            name: 'curveAmount',
            type: 'u64',
          },
          {
            name: 'mint',
            type: 'publicKey',
          },
          {
            name: 'decimals',
            type: 'u8',
          },
          {
            name: 'collateralCurrency',
            type: {
              defined: 'Currency',
            },
          },
          {
            name: 'curveType',
            type: {
              defined: 'CurveType',
            },
          },
          {
            name: 'marketcapThreshold',
            type: 'u64',
          },
          {
            name: 'marketcapCurrency',
            type: {
              defined: 'Currency',
            },
          },
          {
            name: 'migrationFee',
            type: 'u64',
          },
          {
            name: 'coefB',
            type: 'u32',
          },
          {
            name: 'bump',
            type: 'u8',
          },
          {
            name: 'migrationTarget',
            type: {
              defined: 'MigrationTarget',
            },
          },
          {
            name: 'priceIncrease',
            type: 'u16',
          },
        ],
      },
    },
  ],
  types: [
    {
      name: 'Currency',
      type: {
        kind: 'enum',
        variants: [
          {
            name: 'Sol',
          },
        ],
      },
    },
    {
      name: 'CurveType',
      type: {
        kind: 'enum',
        variants: [
          {
            name: 'LinearV1',
          },
          {
            name: 'ConstantProductV1',
          },
          {
            name: 'ConstantProductV2',
          },
          {
            name: 'FlatCurveV1',
          },
          {
            name: 'FlatCurveV1AntiSnipe',
          },
        ],
      },
    },
    {
      name: 'MigrationTarget',
      type: {
        kind: 'enum',
        variants: [
          {
            name: 'Raydium',
          },
          {
            name: 'Meteora',
          },
        ],
      },
    },
    {
      name: 'TradeType',
      type: {
        kind: 'enum',
        variants: [
          {
            name: 'Buy',
          },
          {
            name: 'Sell',
          },
        ],
      },
    },
    {
      name: 'ConfigParams',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'migrationAuthority',
            type: {
              option: 'publicKey',
            },
          },
          {
            name: 'backendAuthority',
            type: {
              option: 'publicKey',
            },
          },
          {
            name: 'configAuthority',
            type: {
              option: 'publicKey',
            },
          },
          {
            name: 'helioFee',
            type: {
              option: 'publicKey',
            },
          },
          {
            name: 'dexFee',
            type: {
              option: 'publicKey',
            },
          },
          {
            name: 'feeBps',
            type: {
              option: 'u16',
            },
          },
          {
            name: 'dexFeeShare',
            type: {
              option: 'u8',
            },
          },
          {
            name: 'migrationFee',
            type: {
              option: 'u64',
            },
          },
          {
            name: 'linearCurveMcapThreshold',
            type: {
              option: 'u64',
            },
          },
          {
            name: 'marketcapCurrency',
            type: {
              option: 'u8',
            },
          },
          {
            name: 'minSupportedDecimalPlaces',
            type: {
              option: 'u8',
            },
          },
          {
            name: 'maxSupportedDecimalPlaces',
            type: {
              option: 'u8',
            },
          },
          {
            name: 'minSupportedTokenSupply',
            type: {
              option: 'u64',
            },
          },
          {
            name: 'maxSupportedTokenSupply',
            type: {
              option: 'u64',
            },
          },
          {
            name: 'coefB',
            type: {
              option: 'u32',
            },
          },
          {
            name: 'constantProductV1McapThreshold',
            type: {
              option: 'u64',
            },
          },
          {
            name: 'constantProductV2McapThreshold',
            type: {
              option: 'u64',
            },
          },
        ],
      },
    },
    {
      name: 'TokenMintParams',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'name',
            type: 'string',
          },
          {
            name: 'symbol',
            type: 'string',
          },
          {
            name: 'uri',
            type: 'string',
          },
          {
            name: 'decimals',
            type: 'u8',
          },
          {
            name: 'collateralCurrency',
            type: 'u8',
          },
          {
            name: 'amount',
            type: 'u64',
          },
          {
            name: 'curveType',
            type: 'u8',
          },
          {
            name: 'migrationTarget',
            type: 'u8',
          },
          {
            name: 'priceIncrease',
            type: 'u16',
          },
          {
            name: 'collateralCollected',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'TradeParams',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'tokenAmount',
            type: 'u64',
          },
          {
            name: 'collateralAmount',
            type: 'u64',
          },
          {
            name: 'fixedSide',
            type: 'u8',
          },
          {
            name: 'slippageBps',
            type: 'u64',
          },
        ],
      },
    },
  ],
  events: [
    {
      name: 'MigrationEvent',
      fields: [
        {
          name: 'tokensMigrated',
          type: 'u64',
          index: false,
        },
        {
          name: 'tokensBurned',
          type: 'u64',
          index: false,
        },
        {
          name: 'collateralMigrated',
          type: 'u64',
          index: false,
        },
        {
          name: 'fee',
          type: 'u64',
          index: false,
        },
        {
          name: 'label',
          type: 'string',
          index: true,
        },
      ],
    },
    {
      name: 'TradeEvent',
      fields: [
        {
          name: 'amount',
          type: 'u64',
          index: false,
        },
        {
          name: 'collateralAmount',
          type: 'u64',
          index: false,
        },
        {
          name: 'dexFee',
          type: 'u64',
          index: false,
        },
        {
          name: 'helioFee',
          type: 'u64',
          index: false,
        },
        {
          name: 'allocation',
          type: 'u64',
          index: false,
        },
        {
          name: 'curve',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'costToken',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'sender',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'type',
          type: {
            defined: 'TradeType',
          },
          index: false,
        },
        {
          name: 'label',
          type: 'string',
          index: true,
        },
      ],
    },
  ],
  errors: [
    {
      code: 6000,
      name: 'InsufficientBalance',
      msg: 'Insufficient SOL to pay for the transaction.',
    },
    {
      code: 6001,
      name: 'InvalidAmount',
      msg: 'The amount must be available in the curve .',
    },
    {
      code: 6002,
      name: 'InvalidSlippage',
      msg: 'The slippage must be under 100 percent.',
    },
    {
      code: 6003,
      name: 'SlippageOverflow',
      msg: 'The cost amount is not in the allowed slippage interval.',
    },
    {
      code: 6004,
      name: 'ThresholdReached',
      msg: 'Threshold limit exceeded.',
    },
    {
      code: 6005,
      name: 'InvalidTokenAccount',
      msg: 'Trade disabled, market cap threshold reached.',
    },
    {
      code: 6006,
      name: 'InvalidCurveAccount',
      msg: 'Invalid curve account.',
    },
    {
      code: 6007,
      name: 'InvalidFeeAccount',
      msg: 'Invalid fee account address.',
    },
    {
      code: 6008,
      name: 'CurveLimit',
      msg: 'Curve limit exceeded.',
    },
    {
      code: 6009,
      name: 'InvalidCurveType',
      msg: 'Invalid curve type.',
    },
    {
      code: 6010,
      name: 'InvalidCurrency',
      msg: 'Invalid currency.',
    },
    {
      code: 6011,
      name: 'Arithmetics',
      msg: 'Artithmetics error',
    },
    {
      code: 6012,
      name: 'ThresholdNotHit',
      msg: 'Market Cap threshold not hit, cannot migrate funds yet',
    },
    {
      code: 6013,
      name: 'InvalidAuthority',
      msg: 'Invalid Authority provided.',
    },
    {
      code: 6014,
      name: 'TradeAmountTooLow',
      msg: 'Trade amount too low , resulting in 0 costs',
    },
    {
      code: 6015,
      name: 'ConfigFieldMissing',
      msg: 'Config field needs to be present during initialization',
    },
    {
      code: 6016,
      name: 'DifferentCurrencies',
      msg: 'Unsupported different currency types',
    },
    {
      code: 6017,
      name: 'BasisPointTooHigh',
      msg: 'Basis points too high',
    },
    {
      code: 6018,
      name: 'FeeShareTooHigh',
      msg: 'Fee share too High',
    },
    {
      code: 6019,
      name: 'TokenDecimalsOutOfRange',
      msg: 'Token decimals are not within the supported range',
    },
    {
      code: 6020,
      name: 'TokenNameTooLong',
      msg: 'Token Name too long, max supported length is 32 bytes',
    },
    {
      code: 6021,
      name: 'TokenSymbolTooLong',
      msg: 'Token Symbol too long, max supported length is 10 bytes',
    },
    {
      code: 6022,
      name: 'TokenURITooLong',
      msg: 'Token URI too long, max supported length is 200 bytes',
    },
    {
      code: 6023,
      name: 'IncorrectDecimalPlacesBounds',
      msg: 'Minimum Decimal Places cannot be lower than Maximum Decimal Places',
    },
    {
      code: 6024,
      name: 'IncorrectTokenSupplyBounds',
      msg: 'Minimum Token Supply cannot be lower than Maximum Token Supply',
    },
    {
      code: 6025,
      name: 'TotalSupplyOutOfBounds',
      msg: 'Token Total Supply out of bounds',
    },
    {
      code: 6026,
      name: 'FinalCollateralTooLow',
      msg: 'This setup will produce final collateral amount less than the migration fee',
    },
    {
      code: 6027,
      name: 'CoefficientZero',
      msg: 'One of the Coefficients is equal to ZERO',
    },
    {
      code: 6028,
      name: 'MarketCapThresholdTooLow',
      msg: 'Market cap Threshold under the Hard lower bound limits',
    },
    {
      code: 6029,
      name: 'CoefBOutofBounds',
      msg: 'Default coef_b set out of hard limit bounds',
    },
    {
      code: 6030,
      name: 'IncorrectMarketCap',
      msg: 'For Constant Product the Market Cap threshold cannot be higher than 325 SOL',
    },
    {
      code: 6031,
      name: 'IncorrectDecimals',
      msg: 'For Constant Product the Decimal places cannot be other than 9',
    },
    {
      code: 6032,
      name: 'IncorrectMaxSupply',
      msg: 'For Constant Product the Maximal Token Supply cannot be other than 1_000_000_000',
    },
    {
      code: 6033,
      name: 'MarketCapTooHigh',
      msg: 'Market Cap Threshold set too high, will not be hit even if Curve Hard Limit reached',
    },
    {
      code: 6034,
      name: 'InvalidMigrationTarget',
      msg: 'This Migration Target is not supported!',
    },
    {
      code: 6035,
      name: 'General',
      msg: 'General error',
    },
    {
      code: 6036,
      name: 'BackendAuthorityRequiredToTrade',
      msg: 'This token has anti-snipe measures. Trade on https://moon.it',
    },
    {
      code: 6037,
      name: 'OnlyAntiSnipeCurves',
      msg: 'Only anti-snipe curves can be traded using this instruction',
    },
  ],
  metadata: {
    address: 'MoonCVVNZFSYkqNXP6bxHLPL6QQJiMagDL3qcqUQTrG',
  },
};

