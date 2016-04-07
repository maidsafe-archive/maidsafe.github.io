var jsonData = {
    "name": "SAFE Network",
    "id": "SAFE_NETWORK",
    "color": "grey-1",
    "desc": "SAFE Network desc",
    "daysCompleted": 10,
    "target": [
        "END"
    ],
    "order": 1,
    "section": 1,
    "status": 0,
    "startDate": "2016-1-1",
    "children": [
        {
            "name": "Network",
            "id": "NETWORK",
            "color": "grey-1",
            "desc": "Network desc",
            "daysCompleted": 10,
            "target": [
                "APP"
            ],
            "order": 1,
            "section": 1,
            "status": 0,
            "startDate": "2016-1-1",
            "children": [
                {
                    "name": "EXTERNAL",
                    "id": "EX_VAULT_MANAGEMENT",
                    "source": "VAULT_IN_MOBILE",
                    "color": "blue-2",
                    "desc": "Vault desc",
                    "order": -1,
                    "section": 1,
                    "target": [
                        "VAULT_CONFIG"
                    ],
                    "startDate": "2016-1-1"
                },
                {
                    "name": "DOWN_STREAM",
                    "id": "DW_MPID_CREATE_MANAGE",
                    "source": "MPID_CREATE_MANAGE",
                    "color": "red-2",
                    "desc": "MPID create manage desc",
                    "order": 999,
                    "section": 1,
                    "target": [
                        "VAULT"
                    ],
                    "startDate": "2016-1-1"
                },
                {
                    "name": "Vault",
                    "id": "VAULT",
                    "color": "red-2",
                    "desc": "Vault desc",
                    "daysCompleted": 10,
                    "target": [
                        "VAULT_CONFIG",
                        "VAULT_IN_MOBILE",
                        "PUBLIC_IDENTITY",
                        "SAFECOIN"
                    ],
                    "order": 1,
                    "section": 1,
                    "status": 1,
                    "startDate": "2016-1-1",
                    "children": [
                        {
                            "name": "Installers",
                            "id": "INSTALLERS",
                            "color": "red-3",
                            "desc": "Installers desc",
                            "daysCompleted": 10,
                            "target": [
                                "TEST_MINIMUM_NETWORK_SIZE_OF"
                            ],
                            "order": 1,
                            "section": 1,
                            "status": 1,
                            "startDate": "2016-1-1",
                            "children": []
                        },
                        {
                            "name": "Network Functionallity",
                            "id": "NETWORK_FUNCTIONALLITY",
                            "color": "red-3",
                            "desc": "Network Functionallity desc",
                            "daysCompleted": 10,
                            "target": [
                                "TEST_MINIMUM_NETWORK_SIZE_OF"
                            ],
                            "order": 2,
                            "section": 1,
                            "status": 1,
                            "startDate": "2016-1-1",
                            "children": [
                                {
                                    "name": "TCP & uTP with UDP hole punching",
                                    "id": "TCP_AND_UTP_WITH_UDP_HOLE_PUNCHING",
                                    "color": "red-4",
                                    "desc": "TCP & uTP with UDP hole punching desc",
                                    "daysCompleted": 10,
                                    "target": [
                                        "SELF_AUTHENTICATION"
                                    ],
                                    "order": 1,
                                    "section": 1,
                                    "status": 1,
                                    "startDate": "2016-1-1",
                                    "children": []
                                },
                                {
                                    "name": "Self Authentication",
                                    "id": "SELF_AUTHENTICATION",
                                    "color": "red-4",
                                    "desc": "Self Authentication desc",
                                    "daysCompleted": 10,
                                    "target": [
                                        "NFS_STORAGE"
                                    ],
                                    "order": 2,
                                    "section": 2,
                                    "status": 1,
                                    "startDate": "2016-1-1",
                                    "children": []
                                },
                                {
                                    "name": "NFS - Storage",
                                    "id": "NFS_STORAGE",
                                    "color": "red-4",
                                    "desc": "NFS - Storage desc",
                                    "daysCompleted": 10,
                                    "target": [
                                        "DNS_CREATE_MANAGE"
                                    ],
                                    "order": 3,
                                    "section": 3,
                                    "status": 1,
                                    "startDate": "2016-1-1",
                                    "children": []
                                },
                                {
                                    "name": "DNS - Create/Manage DNS Records and Services",
                                    "id": "DNS_CREATE_MANAGE",
                                    "color": "red-4",
                                    "desc": "NFS - Storage desc",
                                    "daysCompleted": 10,
                                    "target": [
                                        "END"
                                    ],
                                    "order": 4,
                                    "section": 4,
                                    "status": 1,
                                    "startDate": "2016-1-1",
                                    "children": []
                                }
                            ]
                        },
                        {
                            "name": "Test minimum network size of",
                            "id": "TEST_MINIMUM_NETWORK_SIZE_OF",
                            "color": "red-3",
                            "desc": "Test minimum network size of desc",
                            "daysCompleted": 10,
                            "target": [
                                "END"
                            ],
                            "order": 2,
                            "section": 2,
                            "status": 1,
                            "startDate": "2016-1-1",
                            "children": []
                        }
                    ]
                },
                {
                    "name": "Vault Config",
                    "id": "VAULT_CONFIG",
                    "color": "pink-2",
                    "desc": "Vault config desc",
                    "daysCompleted": 10,
                    "target": [
                        "VAULT_SUPPORT_EMBEDDED"
                    ],
                    "order": 2,
                    "section": 2,
                    "status": 1,
                    "startDate": "2016-1-1",
                    "children": []
                },
                {
                    "name": "Public Identity",
                    "id": "PUBLIC_IDENTITY",
                    "color": "purple-2",
                    "desc": "Public identity desc",
                    "daysCompleted": 10,
                    "target": [
                        "MESSAGING",
                        "DS_SAFECOIN_WALLET_ADDRESS"
                    ],
                    "order": 4,
                    "section": 2,
                    "status": 1,
                    "startDate": "2016-1-1",
                    "children": [
                        {
                            "name": "MPID Create/Manage",
                            "id": "MPID_CREATE_MANAGE",
                            "color": "purple-3",
                            "desc": "MPID Create/Manage desc",
                            "daysCompleted": 10,
                            "target": [
                                "MANAGE_CONTACTS"
                            ],
                            "order": 1,
                            "section": 1,
                            "status": 0,
                            "startDate": "2016-1-1",
                            "children": []
                        },
                        {
                            "name": "Manage Contacts",
                            "id": "MANAGE_CONTACTS",
                            "color": "purple-3",
                            "desc": "Manage Contacts desc",
                            "daysCompleted": 10,
                            "target": [
                                "END"
                            ],
                            "order": 2,
                            "section": 2,
                            "status": 0,
                            "startDate": "2016-1-1",
                            "children": []
                        }
                    ]
                },
                {
                    "name": "Messaging",
                    "id": "MESSAGING",
                    "color": "navy-2",
                    "desc": "Messaging desc",
                    "daysCompleted": 10,
                    "target": [
                        "PAY_THE_PRODUCT",
                        "SMART_CONTRACT",
                        "DS_AGGREGATE_USER_RATING"
                    ],
                    "order": 4,
                    "section": 3,
                    "status": 0,
                    "startDate": "2016-1-1",
                    "children": [
                        {
                            "name": "RFC",
                            "id": "RFC",
                            "color": "navy-3",
                            "desc": "RFC desc",
                            "daysCompleted": 10,
                            "target": [
                                "SYSTEM_LEVEL_MESSAGING_FOR_SAFECOIN"
                            ],
                            "order": 1,
                            "section": 1,
                            "status": 0,
                            "startDate": "2016-1-1",
                            "children": []
                        },
                        {
                            "name": "System Level Messaging for Safecoin",
                            "id": "SYSTEM_LEVEL_MESSAGING_FOR_SAFECOIN",
                            "color": "navy-3",
                            "desc": "System Level Messaging for Safecoin desc",
                            "daysCompleted": 10,
                            "target": [
                                "END"
                            ],
                            "order": 2,
                            "section": 2,
                            "status": 0,
                            "startDate": "2016-1-1",
                            "children": []
                        }
                    ]
                },
                {
                    "name": "Safecoin",
                    "id": "SAFECOIN",
                    "color": "blue-2",
                    "desc": "Safecoin desc",
                    "daysCompleted": 10,
                    "target": [
                        "PAY_THE_PRODUCT",
                        "SMART_CONTRACT"
                    ],
                    "order": 5,
                    "section": 2,
                    "status": 1,
                    "startDate": "2016-1-1",
                    "children": [
                        {
                            "name": "Vault - Safecoin Config",
                            "id": "VAULT_SAFECOIN_CONFIG",
                            "color": "navy-3",
                            "desc": "Vault - Safecoin Config desc",
                            "daysCompleted": 10,
                            "target": [
                                "FARMING"
                            ],
                            "order": 1,
                            "section": 1,
                            "status": 0,
                            "startDate": "2016-1-1",
                            "children": []
                        },
                        {
                            "name": "Farming",
                            "id": "FARMING",
                            "color": "navy-3",
                            "desc": "Farming desc",
                            "daysCompleted": 10,
                            "target": [
                                "USAGE_SIMPLE_SEND_RECIEVE_TO_CONTACTS"
                            ],
                            "order": 2,
                            "section": 2,
                            "status": 0,
                            "startDate": "2016-1-1",
                            "children": []
                        },
                        {
                            "name": "Usage - Simple Send/Recieve to Contacts",
                            "id": "USAGE_SIMPLE_SEND_RECIEVE_TO_CONTACTS",
                            "color": "navy-3",
                            "desc": "Usage - Simple Send/Recieve to Contacts desc",
                            "daysCompleted": 10,
                            "target": [
                                "TRADING"
                            ],
                            "order": 3,
                            "section": 3,
                            "status": 0,
                            "startDate": "2016-1-1",
                            "children": []
                        },
                        {
                            "name": "Trading",
                            "id": "TRADING",
                            "color": "navy-3",
                            "desc": "Trading desc",
                            "daysCompleted": 10,
                            "target": [
                                "END"
                            ],
                            "order": 4,
                            "section": 4,
                            "status": 0,
                            "startDate": "2016-1-1",
                            "children": []
                        }
                    ]
                },
                {
                    "name": "System Update Management",
                    "id": "SYSTEM_UPDATE_MANAGEMENT",
                    "color": "cyan-2",
                    "desc": "System Update Management desc",
                    "daysCompleted": 10,
                    "target": [
                        "END"
                    ],
                    "order": 6,
                    "section": 2,
                    "status": 0,
                    "startDate": "2016-1-1",
                    "children": []
                },
                {
                    "name": "Pay the Producer",
                    "id": "PAY_THE_PRODUCT",
                    "color": "teal-2",
                    "desc": "Pay the Producer desc",
                    "daysCompleted": 10,
                    "target": [
                        "END"
                    ],
                    "order": 5,
                    "section": 4,
                    "status": 1,
                    "startDate": "2016-1-1",
                    "children": []
                },
                {
                    "name": "Data Sharing",
                    "id": "DATA_SHARING",
                    "color": "green-2",
                    "desc": "Data Sharing desc",
                    "daysCompleted": 10,
                    "target": [
                        "END"
                    ],
                    "order": 3,
                    "section": 5,
                    "status": 1,
                    "startDate": "2016-1-1",
                    "children": [
                        {
                            "name": "Private Shares",
                            "id": "PRIVATE_SHARES",
                            "color": "navy-3",
                            "desc": "Private Shares desc",
                            "daysCompleted": 10,
                            "target": [
                                "PUBLIC_SHARES"
                            ],
                            "order": 1,
                            "section": 1,
                            "status": 0,
                            "startDate": "2016-1-1",
                            "children": []
                        },
                        {
                            "name": "Public Shares",
                            "id": "PUBLIC_SHARES",
                            "color": "navy-3",
                            "desc": "Public Shares desc",
                            "daysCompleted": 10,
                            "target": [
                                "OPEN_SHARES"
                            ],
                            "order": 2,
                            "section": 2,
                            "status": 0,
                            "startDate": "2016-1-1",
                            "children": []
                        },
                        {
                            "name": "Open Shares",
                            "id": "OPEN_SHARES",
                            "color": "navy-3",
                            "desc": "Open Shares desc",
                            "daysCompleted": 10,
                            "target": [
                                "END"
                            ],
                            "order": 3,
                            "section": 3,
                            "status": 0,
                            "startDate": "2016-1-1",
                            "children": []
                        }
                    ]
                },
                {
                    "name": "Smart Contracts",
                    "id": "SMART_CONTRACT",
                    "color": "tangerine-2",
                    "desc": "Smart Contracts desc",
                    "daysCompleted": 10,
                    "target": [
                        "COMPUTATION_HANDLING_IN_NETWORK"
                    ],
                    "order": 6,
                    "section": 4,
                    "status": 1,
                    "startDate": "2016-1-1",
                    "children": []
                },
                {
                    "name": "Vault in mobile",
                    "id": "VAULT_IN_MOBILE",
                    "color": "orange-2",
                    "desc": "Vault in mobile desc",
                    "daysCompleted": 10,
                    "target": [
                        "VAULT_SUPPORT_EMBEDDED"
                    ],
                    "order": 3,
                    "section": 2,
                    "status": 1,
                    "startDate": "2016-1-1",
                    "children": []
                },
                {
                    "name": "Vault support embedded",
                    "id": "VAULT_SUPPORT_EMBEDDED",
                    "color": "brown-2",
                    "desc": "Vault support embedded desc",
                    "daysCompleted": 10,
                    "target": [
                        "END"
                    ],
                    "order": 3,
                    "section": 3,
                    "status": 1,
                    "startDate": "2016-1-1",
                    "children": []
                },
                {
                    "name": "Computation Handling in Network",
                    "id": "COMPUTATION_HANDLING_IN_NETWORK",
                    "color": "charcoal-2",
                    "desc": "Computation Handling in Network desc",
                    "daysCompleted": 10,
                    "target": [
                        "END"
                    ],
                    "order": 5,
                    "section": 5,
                    "status": 1,
                    "startDate": "2016-1-1",
                    "children": []
                }
            ]
        },
        {
            "name": "App",
            "id": "APP",
            "color": "grey-2",
            "desc": "App desc",
            "daysCompleted": 10,
            "target": [
                "END"
            ],
            "order": 2,
            "section": 2,
            "status": 1,
            "startDate": "2016-1-1",
            "children": [
              {
                "name": "Launcher",
                "id": "LAUNCHER",
                "color": "grey-2",
                "desc": "Launcher desc",
                "daysCompleted": 10,
                "target": [
                    "FIREFOX_BROWSER_ADDON"
                ],
                "order": 1,
                "section": 1,
                "status": 1,
                "startDate": "2016-1-1",
                "children": [
                  {
                    "name": "Self Authentication",
                    "id": "APP_SELF_AUTHENTICATION",
                    "color": "grey-2",
                    "desc": "Launcher desc",
                    "daysCompleted": 10,
                    "target": [
                        "APP_MANAGEMENT"
                    ],
                    "order": 1,
                    "section": 1,
                    "status": 1,
                    "startDate": "2016-1-1",
                    "children": [
                      {
                        "name": "Create Account",
                        "id": "CREATE_ACCOUNT",
                        "color": "grey-2",
                        "desc": "Create Account desc",
                        "daysCompleted": 10,
                        "target": [
                            "MANAGE_ACCOUNT"
                        ],
                        "order": 1,
                        "section": 1,
                        "status": 1,
                        "startDate": "2016-1-1",
                        "children": []
                      },
                      {
                        "name": "Manage Account",
                        "id": "MANAGE_ACCOUNT",
                        "color": "grey-2",
                        "desc": "Manage Account desc",
                        "daysCompleted": 10,
                        "target": [
                            "END"
                        ],
                        "order": 2,
                        "section": 2,
                        "status": 1,
                        "startDate": "2016-1-1",
                        "children": []
                      }
                    ]
                  },
                  {
                    "name": "App Management",
                    "id": "APP_MANAGEMENT",
                    "color": "grey-2",
                    "desc": "Launcher desc",
                    "daysCompleted": 10,
                    "target": [
                        "LAUNCHER_APP_API"
                    ],
                    "order": 2,
                    "section": 2,
                    "status": 1,
                    "startDate": "2016-1-1",
                    "children": [
                      {
                        "name": "Provide SAFE Drive access to authenticated apps",
                        "id": "PROVIDE_SAFE_DRIVE_ACCESS",
                        "color": "grey-2",
                        "desc": "Provide SAFE Drive access desc",
                        "daysCompleted": 10,
                        "target": [
                            "ADD_OR_REMOVE_APP"
                        ],
                        "order": 1,
                        "section": 1,
                        "status": 1,
                        "startDate": "2016-1-1",
                        "children": []
                      },
                      {
                        "name": "add/remove App",
                        "id": "ADD_OR_REMOVE_APP",
                        "color": "grey-2",
                        "desc": "add/remove App desc",
                        "daysCompleted": 10,
                        "target": [
                            "LAUNCH_APP"
                        ],
                        "order": 2,
                        "section": 2,
                        "status": 1,
                        "startDate": "2016-1-1",
                        "children": []
                      },
                      {
                        "name": "Launch App",
                        "id": "LAUNCH_APP",
                        "color": "grey-2",
                        "desc": "Launch App desc",
                        "daysCompleted": 10,
                        "target": [
                            "END"
                        ],
                        "order": 3,
                        "section": 3,
                        "status": 1,
                        "startDate": "2016-1-1",
                        "children": []
                      }
                    ]
                  },
                  {
                    "name": "Cross Platfrom Desktop CLI client",
                    "id": "CROSS_PLATFROM_DESKTOP_CLI_CLIENT",
                    "color": "grey-2",
                    "desc": "Launcher desc",
                    "daysCompleted": 10,
                    "target": [
                        "LAUNCHER_UI"
                    ],
                    "order": 2,
                    "section": 1,
                    "status": 1,
                    "startDate": "2016-1-1",
                    "children": []
                  },
                  {
                    "name": "Launcher UI",
                    "id": "LAUNCHER_UI",
                    "color": "grey-2",
                    "desc": "Launcher UI desc",
                    "daysCompleted": 10,
                    "target": [
                        "LAUNCHER_APP_API"
                    ],
                    "order": 3,
                    "section": 2,
                    "status": 1,
                    "startDate": "2016-1-1",
                    "children": []
                  },
                  {
                    "name": "Launcher App API",
                    "id": "LAUNCHER_APP_API",
                    "color": "grey-2",
                    "desc": "Launcher App API desc",
                    "daysCompleted": 10,
                    "target": [
                        "APP_INSTALLER"
                    ],
                    "order": 3,
                    "section": 3,
                    "status": 1,
                    "startDate": "2016-1-1",
                    "children": []
                  },
                  {
                    "name": "Installer",
                    "id": "APP_INSTALLER",
                    "color": "grey-2",
                    "desc": "Launcher App API desc",
                    "daysCompleted": 10,
                    "target": [
                        "APP_ANALYTICS"
                    ],
                    "order": 4,
                    "section": 4,
                    "status": 1,
                    "startDate": "2016-1-1",
                    "children": []
                  },
                  {
                    "name": "App Analytics",
                    "id": "APP_ANALYTICS",
                    "color": "grey-2",
                    "desc": "App Analytics desc",
                    "daysCompleted": 10,
                    "target": [
                        "END"
                    ],
                    "order": 5,
                    "section": 5,
                    "status": 1,
                    "startDate": "2016-1-1",
                    "children": []
                  },
                  {
                    "name": "Vault Management",
                    "id": "VAULT_MANAGEMENT",
                    "color": "grey-2",
                    "desc": "Vault Management desc",
                    "daysCompleted": 10,
                    "target": [
                        "FARMING_RATE_HISTORY"
                    ],
                    "order": 6,
                    "section": 5,
                    "status": 1,
                    "startDate": "2016-1-1",
                    "children": []
                  },
                  {
                    "name": "Farming Rate History",
                    "id": "FARMING_RATE_HISTORY",
                    "color": "grey-2",
                    "desc": "Farming Rate History desc",
                    "daysCompleted": 10,
                    "target": [
                        "VAULT_ANALYTICS"
                    ],
                    "order": 7,
                    "section": 6,
                    "status": 1,
                    "startDate": "2016-1-1",
                    "children": []
                  },
                  {
                    "name": "Vault Analytics",
                    "id": "VAULT_ANALYTICS",
                    "color": "grey-2",
                    "desc": "Vault Analytics desc",
                    "daysCompleted": 10,
                    "target": [
                        "END"
                    ],
                    "order": 8,
                    "section": 7,
                    "status": 1,
                    "startDate": "2016-1-1",
                    "children": []
                  },
                  {
                    "name": "Portable App Store",
                    "id": "PORTABLE_APP_STORE",
                    "color": "grey-2",
                    "desc": "Portable App Store desc",
                    "daysCompleted": 10,
                    "target": [
                        "END"
                    ],
                    "order": 9,
                    "section": 7,
                    "status": 1,
                    "startDate": "2016-1-1",
                    "children": []
                  }
                ]
              },
              {
                "name": "Firefox Browser Addon",
                "id": "FIREFOX_BROWSER_ADDON",
                "color": "grey-2",
                "desc": "Firefox Browser Addon desc",
                "daysCompleted": 10,
                "target": [
                    "STORAGE_APP"
                ],
                "order": 2,
                "section": 2,
                "status": 1,
                "startDate": "2016-1-1",
                "children": []
              },
              {
                "name": "Storage App",
                "id": "STORAGE_APP",
                "color": "grey-2",
                "desc": "Storage App desc",
                "daysCompleted": 10,
                "target": [
                    "APP_MESSAGING"
                ],
                "order": 3,
                "section": 3,
                "status": 1,
                "startDate": "2016-1-1",
                "children": []
              },
              {
                "name": "Messaging",
                "id": "APP_MESSAGING",
                "color": "grey-2",
                "desc": "Messaging desc",
                "daysCompleted": 10,
                "target": [
                    "SAFECOIN_WALLET"
                ],
                "order": 4,
                "section": 4,
                "status": 1,
                "startDate": "2016-1-1",
                "children": []
              },
              {
                "name": "Safecoin Wallet",
                "id": "SAFECOIN_WALLET",
                "color": "grey-2",
                "desc": "Safecoin Wallet desc",
                "daysCompleted": 10,
                "target": [
                    "SAFECOIN_EXCHANGE"
                ],
                "order": 5,
                "section": 5,
                "status": 1,
                "startDate": "2016-1-1",
                "children": []
              },
              {
                "name": "Safecoin Exchange",
                "id": "SAFECOIN_EXCHANGE",
                "color": "grey-2",
                "desc": "Safecoin Exchange desc",
                "daysCompleted": 10,
                "target": [
                    "CMS"
                ],
                "order": 6,
                "section": 6,
                "status": 1,
                "startDate": "2016-1-1",
                "children": []
              },
              {
                "name": "CMS",
                "id": "CMS",
                "color": "grey-2",
                "desc": "CMS desc",
                "daysCompleted": 10,
                "target": [
                    "END"
                ],
                "order": 7,
                "section": 7,
                "status": 1,
                "startDate": "2016-1-1",
                "children": []
              }
            ]
        }
    ]
};
