/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/token_launchpad.json`.
 */
export type IDL_V4 = {
  address: '9oZhKSzHrr3z1mm2Z4iutf8koU7FjcTpGRqkpAFYWQYN';
  metadata: {
    name: 'tokenLaunchpad';
    version: '0.1.0';
    spec: '0.1.0';
    description: 'Created with Anchor';
  };
  instructions: [
    {
      name: 'buy';
      discriminator: [102, 6, 61, 18, 1, 218, 235, 234];
      accounts: [
        {
          name: 'signerOrSession';
          docs: ['This is either the user or a session representing the user'];
          writable: true;
          signer: true;
        },
        {
          name: 'payer';
          docs: [
            'Separate fee payer for account creations (cannot be the session)',
          ];
          writable: true;
          signer: true;
        },
        {
          name: 'programSigner';
          docs: [
            'If within a session, this account is needed to sign token transfers in addition to the session key.',
          ];
          optional: true;
        },
        {
          name: 'user';
          docs: [
            'The underlying user account extracted from the session (not necessarily a signer here)',
          ];
        },
        {
          name: 'senderTokenAccount';
          writable: true;
        },
        {
          name: 'curveAccount';
          writable: true;
        },
        {
          name: 'curveTokenAccount';
          writable: true;
        },
        {
          name: 'wsolMint';
        },
        {
          name: 'senderWsolAccount';
          writable: true;
        },
        {
          name: 'curveWsolAccount';
          writable: true;
        },
        {
          name: 'dexFee';
          writable: true;
        },
        {
          name: 'dexFeeWsolAccount';
          writable: true;
        },
        {
          name: 'helioFee';
          writable: true;
        },
        {
          name: 'helioFeeWsolAccount';
          writable: true;
        },
        {
          name: 'mint';
        },
        {
          name: 'configAccount';
        },
        {
          name: 'tokenProgram';
        },
        {
          name: 'associatedTokenProgram';
        },
        {
          name: 'systemProgram';
        },
      ];
      args: [
        {
          name: 'data';
          type: {
            defined: {
              name: 'tradeParams';
            };
          };
        },
      ];
    },
    {
      name: 'buyWithBeAuthority';
      discriminator: [79, 77, 171, 237, 157, 49, 235, 198];
      accounts: [
        {
          name: 'backendAuthority';
          docs: ['BE Authority'];
          signer: true;
        },
        {
          name: 'signerOrSession';
          docs: ['This is either the user or a session representing the user'];
          writable: true;
          signer: true;
        },
        {
          name: 'payer';
          docs: ['Separate fee payer (cannot be session)'];
          writable: true;
          signer: true;
        },
        {
          name: 'programSigner';
          docs: ['Program co-signer PDA when in session'];
          optional: true;
        },
        {
          name: 'user';
          docs: ['Underlying user'];
        },
        {
          name: 'senderTokenAccount';
          writable: true;
        },
        {
          name: 'curveAccount';
          writable: true;
        },
        {
          name: 'curveTokenAccount';
          writable: true;
        },
        {
          name: 'wsolMint';
        },
        {
          name: 'senderWsolAccount';
          writable: true;
        },
        {
          name: 'curveWsolAccount';
          writable: true;
        },
        {
          name: 'dexFee';
          writable: true;
        },
        {
          name: 'dexFeeWsolAccount';
          writable: true;
        },
        {
          name: 'helioFee';
          writable: true;
        },
        {
          name: 'helioFeeWsolAccount';
          writable: true;
        },
        {
          name: 'mint';
        },
        {
          name: 'configAccount';
        },
        {
          name: 'tokenProgram';
        },
        {
          name: 'associatedTokenProgram';
        },
        {
          name: 'systemProgram';
        },
      ];
      args: [
        {
          name: 'data';
          type: {
            defined: {
              name: 'tradeParams';
            };
          };
        },
      ];
    },
    {
      name: 'configInit';
      discriminator: [13, 236, 164, 173, 106, 253, 164, 185];
      accounts: [
        {
          name: 'configAuthority';
          writable: true;
          signer: true;
        },
        {
          name: 'configAccount';
          writable: true;
        },
        {
          name: 'systemProgram';
        },
      ];
      args: [
        {
          name: 'data';
          type: {
            defined: {
              name: 'configParams';
            };
          };
        },
      ];
    },
    {
      name: 'configUpdate';
      discriminator: [80, 37, 109, 136, 82, 135, 89, 241];
      accounts: [
        {
          name: 'configAuthority';
          signer: true;
        },
        {
          name: 'configAccount';
          writable: true;
        },
      ];
      args: [
        {
          name: 'data';
          type: {
            defined: {
              name: 'configParams';
            };
          };
        },
      ];
    },
    {
      name: 'migrateFunds';
      discriminator: [42, 229, 10, 231, 189, 62, 193, 174];
      accounts: [
        {
          name: 'backendAuthority';
          docs: ['BE Authority'];
          signer: true;
        },
        {
          name: 'migrationAuthority';
          docs: [
            'Migration Authority',
            'Owner and Payer over Token Accounts, needs to be mutable',
          ];
          writable: true;
          signer: true;
        },
        {
          name: 'curveAccount';
          docs: [
            'Curve Account',
            'The account is closed after this instruction',
          ];
          writable: true;
        },
        {
          name: 'curveTokenAccount';
          docs: [
            'Curve Token Account',
            'The account is closed after this instruction',
          ];
          writable: true;
        },
        {
          name: 'migrationAuthorityTokenAccount';
          docs: ['Authority token Account', 'Init on demand'];
          writable: true;
        },
        {
          name: 'mint';
          docs: [
            'InterfaceAccount: checks program ownership + deserialize into Mint',
          ];
          writable: true;
        },
        {
          name: 'wsolMint';
        },
        {
          name: 'migrationAuthorityWsolAccount';
          writable: true;
        },
        {
          name: 'curveWsolAccount';
          writable: true;
        },
        {
          name: 'dexFeeAccount';
          writable: true;
        },
        {
          name: 'dexFeeWsolAccount';
          writable: true;
        },
        {
          name: 'helioFeeAccount';
          writable: true;
        },
        {
          name: 'helioFeeWsolAccount';
          writable: true;
        },
        {
          name: 'configAccount';
        },
        {
          name: 'systemProgram';
        },
        {
          name: 'tokenProgram';
        },
        {
          name: 'associatedTokenProgram';
        },
      ];
      args: [];
    },
    {
      name: 'sell';
      discriminator: [51, 230, 133, 164, 1, 127, 131, 173];
      accounts: [
        {
          name: 'signerOrSession';
          docs: ['This is either the user or a session representing the user'];
          writable: true;
          signer: true;
        },
        {
          name: 'payer';
          docs: [
            'Separate fee payer for account creations (cannot be the session)',
          ];
          writable: true;
          signer: true;
        },
        {
          name: 'programSigner';
          docs: ['If within a session, PDA co-signer for token transfers'];
          optional: true;
        },
        {
          name: 'user';
          docs: ['The underlying user extracted from the session'];
        },
        {
          name: 'senderTokenAccount';
          writable: true;
        },
        {
          name: 'curveAccount';
          writable: true;
        },
        {
          name: 'curveTokenAccount';
          writable: true;
        },
        {
          name: 'wsolMint';
        },
        {
          name: 'senderWsolAccount';
          writable: true;
        },
        {
          name: 'curveWsolAccount';
          writable: true;
        },
        {
          name: 'dexFee';
          writable: true;
        },
        {
          name: 'dexFeeWsolAccount';
          writable: true;
        },
        {
          name: 'helioFee';
          writable: true;
        },
        {
          name: 'helioFeeWsolAccount';
          writable: true;
        },
        {
          name: 'mint';
        },
        {
          name: 'configAccount';
        },
        {
          name: 'tokenProgram';
        },
        {
          name: 'associatedTokenProgram';
        },
        {
          name: 'systemProgram';
        },
      ];
      args: [
        {
          name: 'data';
          type: {
            defined: {
              name: 'tradeParams';
            };
          };
        },
      ];
    },
    {
      name: 'tokenMint';
      discriminator: [3, 44, 164, 184, 123, 13, 245, 179];
      accounts: [
        {
          name: 'signerOrSession';
          docs: ['This is either the user or a session representing the user'];
          writable: true;
          signer: true;
        },
        {
          name: 'payer';
          docs: [
            'Payer for account initializations (must be a regular wallet, not a session)',
          ];
          writable: true;
          signer: true;
        },
        {
          name: 'backendAuthority';
          signer: true;
        },
        {
          name: 'curveAccount';
          writable: true;
        },
        {
          name: 'mint';
          writable: true;
          signer: true;
        },
        {
          name: 'mintMetadata';
          docs: [
            'Type validating that the account is owned by the System Program = uninitialized',
            'seeds should ensure that the address is correct',
          ];
          writable: true;
        },
        {
          name: 'curveTokenAccount';
          writable: true;
        },
        {
          name: 'wsolMint';
        },
        {
          name: 'curveWsolAccount';
          writable: true;
        },
        {
          name: 'configAccount';
        },
        {
          name: 'tokenProgram';
        },
        {
          name: 'associatedTokenProgram';
        },
        {
          name: 'mplTokenMetadata';
        },
        {
          name: 'systemProgram';
        },
      ];
      args: [
        {
          name: 'mintParams';
          type: {
            defined: {
              name: 'tokenMintParams';
            };
          };
        },
      ];
    },
  ];
  accounts: [
    {
      name: 'configAccount';
      discriminator: [189, 255, 97, 70, 186, 189, 24, 102];
    },
    {
      name: 'curveAccount';
      discriminator: [8, 91, 83, 28, 132, 216, 248, 22];
    },
  ];
  events: [
    {
      name: 'migrationEvent';
      discriminator: [255, 202, 76, 147, 91, 231, 73, 22];
    },
    {
      name: 'tradeEvent';
      discriminator: [189, 219, 127, 211, 78, 230, 97, 238];
    },
  ];
  errors: [
    {
      code: 6000;
      name: 'insufficientBalance';
      msg: 'Insufficient SOL to pay for the transaction.';
    },
    {
      code: 6001;
      name: 'invalidAmount';
      msg: 'The amount must be available in the curve .';
    },
    {
      code: 6002;
      name: 'invalidSlippage';
      msg: 'The slippage must be under 100 percent.';
    },
    {
      code: 6003;
      name: 'slippageOverflow';
      msg: 'The cost amount is not in the allowed slippage interval.';
    },
    {
      code: 6004;
      name: 'thresholdReached';
      msg: 'Threshold limit exceeded.';
    },
    {
      code: 6005;
      name: 'invalidTokenAccount';
      msg: 'Trade disabled, market cap threshold reached.';
    },
    {
      code: 6006;
      name: 'invalidCurveAccount';
      msg: 'Invalid curve account.';
    },
    {
      code: 6007;
      name: 'invalidFeeAccount';
      msg: 'Invalid fee account address.';
    },
    {
      code: 6008;
      name: 'curveLimit';
      msg: 'Curve limit exceeded.';
    },
    {
      code: 6009;
      name: 'invalidCurveType';
      msg: 'Invalid curve type.';
    },
    {
      code: 6010;
      name: 'invalidCurrency';
      msg: 'Invalid currency.';
    },
    {
      code: 6011;
      name: 'arithmetics';
      msg: 'Artithmetics error';
    },
    {
      code: 6012;
      name: 'thresholdNotHit';
      msg: 'Market Cap threshold not hit, cannot migrate funds yet';
    },
    {
      code: 6013;
      name: 'invalidAuthority';
      msg: 'Invalid Authority provided.';
    },
    {
      code: 6014;
      name: 'tradeAmountTooLow';
      msg: 'Trade amount too low , resulting in 0 costs';
    },
    {
      code: 6015;
      name: 'configFieldMissing';
      msg: 'Config field needs to be present during initialization';
    },
    {
      code: 6016;
      name: 'differentCurrencies';
      msg: 'Unsupported different currency types';
    },
    {
      code: 6017;
      name: 'basisPointTooHigh';
      msg: 'Basis points too high';
    },
    {
      code: 6018;
      name: 'feeShareTooHigh';
      msg: 'Fee share too High';
    },
    {
      code: 6019;
      name: 'tokenDecimalsOutOfRange';
      msg: 'Token decimals are not within the supported range';
    },
    {
      code: 6020;
      name: 'tokenNameTooLong';
      msg: 'Token Name too long, max supported length is 32 bytes';
    },
    {
      code: 6021;
      name: 'tokenSymbolTooLong';
      msg: 'Token Symbol too long, max supported length is 10 bytes';
    },
    {
      code: 6022;
      name: 'tokenUriTooLong';
      msg: 'Token URI too long, max supported length is 200 bytes';
    },
    {
      code: 6023;
      name: 'incorrectDecimalPlacesBounds';
      msg: 'Minimum Decimal Places cannot be lower than Maximum Decimal Places';
    },
    {
      code: 6024;
      name: 'incorrectTokenSupplyBounds';
      msg: 'Minimum Token Supply cannot be lower than Maximum Token Supply';
    },
    {
      code: 6025;
      name: 'totalSupplyOutOfBounds';
      msg: 'Token Total Supply out of bounds';
    },
    {
      code: 6026;
      name: 'finalCollateralTooLow';
      msg: 'This setup will produce final collateral amount less than the migration fee';
    },
    {
      code: 6027;
      name: 'coefficientZero';
      msg: 'One of the Coefficients is equal to ZERO';
    },
    {
      code: 6028;
      name: 'marketCapThresholdTooLow';
      msg: 'Market cap Threshold under the Hard lower bound limits';
    },
    {
      code: 6029;
      name: 'coefBOutofBounds';
      msg: 'Default coef_b set out of hard limit bounds';
    },
    {
      code: 6030;
      name: 'incorrectMarketCap';
      msg: 'For Constant Product the Market Cap threshold cannot be higher than 325 SOL';
    },
    {
      code: 6031;
      name: 'incorrectDecimals';
      msg: 'For Constant Product the Decimal places cannot be other than 9';
    },
    {
      code: 6032;
      name: 'incorrectMaxSupply';
      msg: 'For Constant Product the Maximal Token Supply cannot be other than 1_000_000_000';
    },
    {
      code: 6033;
      name: 'marketCapTooHigh';
      msg: 'Market Cap Threshold set too high, will not be hit even if Curve Hard Limit reached';
    },
    {
      code: 6034;
      name: 'invalidMigrationTarget';
      msg: 'This Migration Target is not supported!';
    },
    {
      code: 6035;
      name: 'general';
      msg: 'General error';
    },
    {
      code: 6036;
      name: 'backendAuthorityRequiredToTrade';
      msg: 'This token has anti-snipe measures. Trade on https://moon.it';
    },
    {
      code: 6037;
      name: 'onlyAntiSnipeCurves';
      msg: 'Only anti-snipe curves can be traded using this instruction';
    },
    {
      code: 6038;
      name: 'sessionRequired';
      msg: 'Session is required for this instruction';
    },
    {
      code: 6039;
      name: 'sessionUserMismatch';
      msg: 'Session does not authorize this user';
    },
  ];
  types: [
    {
      name: 'configAccount';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'migrationAuthority';
            type: 'pubkey';
          },
          {
            name: 'backendAuthority';
            type: 'pubkey';
          },
          {
            name: 'configAuthority';
            type: 'pubkey';
          },
          {
            name: 'helioFee';
            type: 'pubkey';
          },
          {
            name: 'dexFee';
            type: 'pubkey';
          },
          {
            name: 'feeBps';
            type: 'u16';
          },
          {
            name: 'dexFeeShare';
            type: 'u8';
          },
          {
            name: 'migrationFee';
            type: 'u64';
          },
          {
            name: 'linearCurveMcapThreshold';
            type: 'u64';
          },
          {
            name: 'marketcapCurrency';
            type: {
              defined: {
                name: 'currency';
              };
            };
          },
          {
            name: 'minSupportedDecimalPlaces';
            type: 'u8';
          },
          {
            name: 'maxSupportedDecimalPlaces';
            type: 'u8';
          },
          {
            name: 'minSupportedTokenSupply';
            type: 'u64';
          },
          {
            name: 'maxSupportedTokenSupply';
            type: 'u64';
          },
          {
            name: 'bump';
            type: 'u8';
          },
          {
            name: 'coefB';
            type: 'u32';
          },
          {
            name: 'constantProductV1McapThreshold';
            type: 'u64';
          },
          {
            name: 'constantProductV2McapThreshold';
            type: 'u64';
          },
        ];
      };
    },
    {
      name: 'configParams';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'migrationAuthority';
            type: {
              option: 'pubkey';
            };
          },
          {
            name: 'backendAuthority';
            type: {
              option: 'pubkey';
            };
          },
          {
            name: 'configAuthority';
            type: {
              option: 'pubkey';
            };
          },
          {
            name: 'helioFee';
            type: {
              option: 'pubkey';
            };
          },
          {
            name: 'dexFee';
            type: {
              option: 'pubkey';
            };
          },
          {
            name: 'feeBps';
            type: {
              option: 'u16';
            };
          },
          {
            name: 'dexFeeShare';
            type: {
              option: 'u8';
            };
          },
          {
            name: 'migrationFee';
            type: {
              option: 'u64';
            };
          },
          {
            name: 'linearCurveMcapThreshold';
            type: {
              option: 'u64';
            };
          },
          {
            name: 'marketcapCurrency';
            type: {
              option: 'u8';
            };
          },
          {
            name: 'minSupportedDecimalPlaces';
            type: {
              option: 'u8';
            };
          },
          {
            name: 'maxSupportedDecimalPlaces';
            type: {
              option: 'u8';
            };
          },
          {
            name: 'minSupportedTokenSupply';
            type: {
              option: 'u64';
            };
          },
          {
            name: 'maxSupportedTokenSupply';
            type: {
              option: 'u64';
            };
          },
          {
            name: 'coefB';
            type: {
              option: 'u32';
            };
          },
          {
            name: 'constantProductV1McapThreshold';
            type: {
              option: 'u64';
            };
          },
          {
            name: 'constantProductV2McapThreshold';
            type: {
              option: 'u64';
            };
          },
        ];
      };
    },
    {
      name: 'currency';
      repr: {
        kind: 'rust';
      };
      type: {
        kind: 'enum';
        variants: [
          {
            name: 'sol';
          },
        ];
      };
    },
    {
      name: 'curveAccount';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'totalSupply';
            type: 'u64';
          },
          {
            name: 'curveAmount';
            type: 'u64';
          },
          {
            name: 'mint';
            type: 'pubkey';
          },
          {
            name: 'decimals';
            type: 'u8';
          },
          {
            name: 'collateralCurrency';
            type: {
              defined: {
                name: 'currency';
              };
            };
          },
          {
            name: 'curveType';
            type: {
              defined: {
                name: 'curveType';
              };
            };
          },
          {
            name: 'marketcapThreshold';
            type: 'u64';
          },
          {
            name: 'marketcapCurrency';
            type: {
              defined: {
                name: 'currency';
              };
            };
          },
          {
            name: 'migrationFee';
            type: 'u64';
          },
          {
            name: 'coefB';
            type: 'u32';
          },
          {
            name: 'bump';
            type: 'u8';
          },
          {
            name: 'migrationTarget';
            type: {
              defined: {
                name: 'migrationTarget';
              };
            };
          },
          {
            name: 'priceIncrease';
            type: 'u16';
          },
        ];
      };
    },
    {
      name: 'curveType';
      repr: {
        kind: 'rust';
      };
      type: {
        kind: 'enum';
        variants: [
          {
            name: 'linearV1';
          },
          {
            name: 'constantProductV1';
          },
          {
            name: 'constantProductV2';
          },
          {
            name: 'flatCurveV1';
          },
          {
            name: 'flatCurveV1AntiSnipe';
          },
        ];
      };
    },
    {
      name: 'migrationEvent';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'tokensMigrated';
            type: 'u64';
          },
          {
            name: 'tokensBurned';
            type: 'u64';
          },
          {
            name: 'collateralMigrated';
            type: 'u64';
          },
          {
            name: 'fee';
            type: 'u64';
          },
          {
            name: 'label';
            type: 'string';
          },
        ];
      };
    },
    {
      name: 'migrationTarget';
      repr: {
        kind: 'rust';
      };
      type: {
        kind: 'enum';
        variants: [
          {
            name: 'valiant';
          },
        ];
      };
    },
    {
      name: 'tokenMintParams';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'name';
            type: 'string';
          },
          {
            name: 'symbol';
            type: 'string';
          },
          {
            name: 'uri';
            type: 'string';
          },
          {
            name: 'decimals';
            type: 'u8';
          },
          {
            name: 'collateralCurrency';
            type: 'u8';
          },
          {
            name: 'amount';
            type: 'u64';
          },
          {
            name: 'curveType';
            type: 'u8';
          },
          {
            name: 'migrationTarget';
            type: 'u8';
          },
          {
            name: 'priceIncrease';
            type: 'u16';
          },
          {
            name: 'collateralCollected';
            type: 'u64';
          },
        ];
      };
    },
    {
      name: 'tradeEvent';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'amount';
            type: 'u64';
          },
          {
            name: 'collateralAmount';
            type: 'u64';
          },
          {
            name: 'dexFee';
            type: 'u64';
          },
          {
            name: 'helioFee';
            type: 'u64';
          },
          {
            name: 'allocation';
            type: 'u64';
          },
          {
            name: 'curve';
            type: 'pubkey';
          },
          {
            name: 'costToken';
            type: 'pubkey';
          },
          {
            name: 'sender';
            type: 'pubkey';
          },
          {
            name: 'type';
            type: {
              defined: {
                name: 'tradeType';
              };
            };
          },
          {
            name: 'label';
            type: 'string';
          },
        ];
      };
    },
    {
      name: 'tradeParams';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'tokenAmount';
            type: 'u64';
          },
          {
            name: 'collateralAmount';
            type: 'u64';
          },
          {
            name: 'fixedSide';
            type: 'u8';
          },
          {
            name: 'slippageBps';
            type: 'u64';
          },
        ];
      };
    },
    {
      name: 'tradeType';
      type: {
        kind: 'enum';
        variants: [
          {
            name: 'buy';
          },
          {
            name: 'sell';
          },
        ];
      };
    },
  ];
};
