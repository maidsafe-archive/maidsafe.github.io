/*jshint quotmark: double */
var jsonData = {
  "name": "SAFE Network",
  "id": "SAFE_NETWORK",
  "color": "grey-1",
  "desc": "SAFE Network desc",
  "daysCompleted": 42,
  "inProgress": 33,
  "planned": 25,
  "target": [
    "END"
  ],
  "order": 1,
  "section": 1,
  "status": 0,
  "startDate": "2016-1-1",
  "children": [{
    "name": "Network",
    "id": "NETWORK",
    "color": "grey-2",
    "desc": "Network desc",
    "daysCompleted": 42,
    "inProgress": 33,
    "planned": 25,
    "target": [
      "END"
    ],
    "order": 1,
    "section": 1,
    "status": 0,
    "startDate": "2016-1-1",
    "children": [{
      "name": "DOWN_STREAM",
      "id": "DW_APP_SELF_AUTHENTICATION",
      "source": "APP_SELF_AUTHENTICATION",
      "color": "moss-2",
      "desc": "App Self Authentication",
      "order": 999,
      "section": 2,
      "target": [
        "VAULT"
      ],
      "startDate": "2016-1-1"
    }, {
      "name": "DOWN_STREAM",
      "id": "DW_VAULT_MANAGEMENT",
      "source": "VAULT_MANAGEMENT",
      "color": "pink-2",
      "desc": "vault management",
      "order": 999,
      "section": 3,
      "target": [
        "VAULT_CONFIG"
      ],
      "startDate": "2016-1-1"
    }, {
      "name": "DOWN_STREAM",
      "id": "DW_SAFECOIN_WALLET_ADDRESS",
      "source": "SAFECOIN_WALLET_ADDRESS",
      "color": "purple-2",
      "desc": "Safecoin wallet address management",
      "order": 999,
      "section": 3,
      "target": [
        "PUBLIC_IDENTITY"
      ],
      "startDate": "2016-1-1"
    }, {
      "name": "DOWN_STREAM",
      "id": "DW_AGGREGATE_USER_RATINGS",
      "source": "AGGREGATE_USER_RATINGS",
      "color": "navy-2",
      "desc": "Aggregate user ratings",
      "order": 999,
      "section": 4,
      "target": [
        "MESSAGING"
      ],
      "startDate": "2016-1-1"
    }, {
      "name": "EXTERNAL",
      "id": "DW_INSTALLERS",
      "source": "INSTALLERS",
      "color": "moss-3",
      "desc": "INSTALLERS",
      "order": -1,
      "section": 2,
      "target": [
        "SYSTEM_UPDATE_MANAGEMENT"
      ],
      "startDate": "2016-1-1"
    }, {
      "name": "EXTERNAL",
      "id": "DW_INSTALLERS_DATA_SHARING",
      "source": "INSTALLERS",
      "color": "moss-3",
      "desc": "INSTALLERS",
      "order": -1,
      "section": 2,
      "target": [
        "DATA_SHARING"
      ],
      "startDate": "2016-1-1"
    }, {
      "name": "Vault",
      "id": "VAULT",
      "color": "moss-2",
      "desc": "Vault desc",
      "daysCompleted": 42,
      "inProgress": 33,
      "planned": 25,
      "target": [
        "VAULT_CONFIG",
        "VAULT_IN_MOBILE",
        "PUBLIC_IDENTITY",
        "SAFECOIN",
        "MVP"
      ],
      "order": 1,
      "section": 1,
      "status": 0,
      "startDate": "2016-1-1",
      "children": [{
        "name": "DOWN_STREAM",
        "id": "DW_SYSTEM_UPDATE_MANAGEMENT",
        "source": "SYSTEM_UPDATE_MANAGEMENT",
        "color": "moss-3",
        "desc": "System update management",
        "order": 999,
        "section": 1,
        "target": [
          "INSTALLERS"
        ],
        "startDate": "2016-1-1"
      }, {
        "name": "DOWN_STREAM",
        "id": "DW_DATA_SHARING",
        "source": "DATA_SHARING",
        "color": "moss-3",
        "desc": "Data sharing",
        "order": 999,
        "section": 1,
        "target": [
          "INSTALLERS"
        ],
        "startDate": "2016-1-1"
      }, {
        "name": "Network Functionallity",
        "id": "NETWORK_FUNCTIONALLITY",
        "color": "moss-3",
        "desc": "Network Functionallity desc",
        "daysCompleted": 42,
        "inProgress": 33,
        "planned": 25,
        "target": [
          "INSTALLERS"
        ],
        "order": 1,
        "section": 1,
        "status": 1,
        "startDate": "2016-1-1",
        "children": [{
          "name": "TCP & uTP with UDP hole punching",
          "id": "TCP_AND_UTP_WITH_UDP_HOLE_PUNCHING",
          "color": "moss-4",
          "desc": "TCP & uTP with UDP hole punching desc",
          "daysCompleted": 42,
          "inProgress": 33,
          "planned": 25,
          "target": [
            "SELF_AUTHENTICATION"
          ],
          "order": 1,
          "section": 1,
          "status": 1,
          "startDate": "2016-1-1",
          "children": []
        }, {
          "name": "Self Authentication",
          "id": "SELF_AUTHENTICATION",
          "color": "moss-4",
          "desc": "Self Authentication desc",
          "daysCompleted": 42,
          "inProgress": 33,
          "planned": 25,
          "target": [
            "NFS_STORAGE"
          ],
          "order": 2,
          "section": 2,
          "status": 1,
          "startDate": "2016-1-1",
          "children": []
        }, {
          "name": "NFS - Storage",
          "id": "NFS_STORAGE",
          "color": "moss-4",
          "desc": "NFS - Storage desc",
          "daysCompleted": 42,
          "inProgress": 33,
          "planned": 25,
          "target": [
            "DNS_CREATE_MANAGE"
          ],
          "order": 3,
          "section": 3,
          "status": 1,
          "startDate": "2016-1-1",
          "children": []
        }, {
          "name": "DNS - Create/Manage DNS Records and Services",
          "id": "DNS_CREATE_MANAGE",
          "color": "moss-4",
          "desc": "NFS - Storage desc",
          "daysCompleted": 42,
          "inProgress": 33,
          "planned": 25,
          "target": [
            "END"
          ],
          "order": 4,
          "section": 4,
          "status": 1,
          "startDate": "2016-1-1",
          "children": []
        }]
      }, {
        "name": "Desktop Installers",
        "id": "INSTALLERS",
        "color": "moss-3",
        "desc": "Installers desc",
        "daysCompleted": 42,
        "inProgress": 33,
        "planned": 25,
        "target": [
          "TEST_MINIMUM_NETWORK_SIZE_OF"
        ],
        "order": 2,
        "section": 2,
        "status": 1,
        "startDate": "2016-1-1",
        "children": [{
          "name": "OS X",
          "id": "OSX",
          "color": "moss-4",
          "desc": "",
          "daysCompleted": 42,
          "inProgress": 33,
          "planned": 25,
          "target": [
            "END"
          ],
          "order": 1,
          "section": 1,
          "status": 1,
          "startDate": "2016-1-1",
          "children": []
        }, {
          "name": "Windows",
          "id": "WINDOWS",
          "color": "moss-4",
          "desc": "",
          "daysCompleted": 42,
          "inProgress": 33,
          "planned": 25,
          "target": [
            "END"
          ],
          "order": 2,
          "section": 1,
          "status": 1,
          "startDate": "2016-1-1",
          "children": []
        }, {
          "name": "Linux",
          "id": "LINUX",
          "color": "moss-4",
          "desc": "",
          "daysCompleted": 42,
          "inProgress": 33,
          "planned": 25,
          "target": [
            "END"
          ],
          "order": 3,
          "section": 1,
          "status": 1,
          "startDate": "2016-1-1",
          "children": []
        }]
      }, {
        "name": "Test remote network (MVP)",
        "id": "TEST_MINIMUM_NETWORK_SIZE_OF",
        "color": "moss-3",
        "desc": "Test remote network desc",
        "daysCompleted": 42,
        "inProgress": 33,
        "planned": 25,
        "target": [
          "END"
        ],
        "order": 3,
        "section": 3,
        "status": 0,
        "startDate": "2016-1-1",
        "children": []
      }]
    }, {
      "name": "MVP",
      "id": "MVP",
      "color": "tangerine-3",
      "desc": "",
      "daysCompleted": 42,
      "inProgress": 33,
      "planned": 25,
      "target": [
        "END"
      ],
      "order": 2,
      "section": 2,
      "status": 1,
      "startDate": "2016-1-1",
      "children": []
    }, {
      "name": "Vault Config",
      "id": "VAULT_CONFIG",
      "color": "pink-2",
      "desc": "User configuration options for vaults",
      "daysCompleted": 42,
      "inProgress": 33,
      "planned": 25,
      "target": [
        // "VAULT_SUPPORT_EMBEDDED"
      ],
      "order": 3,
      "section": 2,
      "status": 0,
      "startDate": "2016-1-1",
      "children": [{
        "name": "Max Capacity",
        "id": "MAX_CAPACITY",
        "color": "pink-3",
        "desc": "",
        "daysCompleted": 42,
        "inProgress": 33,
        "planned": 25,
        "target": [
          "END"
        ],
        "order": 1,
        "section": 1,
        "status": 1,
        "startDate": "2016-1-1",
        "children": []
      }, {
        "name": "Wallet Address",
        "id": "WALLET_ADDRESS",
        "color": "pink-3",
        "desc": "",
        "daysCompleted": 42,
        "inProgress": 33,
        "planned": 25,
        "target": [
          "END"
        ],
        "order": 2,
        "section": 1,
        "status": 1,
        "startDate": "2016-1-1",
        "children": []
      }, {
        "name": "Location",
        "id": "VAULT_CONFIG_LOCATION",
        "color": "pink-3",
        "desc": "",
        "daysCompleted": 42,
        "inProgress": 33,
        "planned": 25,
        "target": [
          "END"
        ],
        "order": 3,
        "section": 1,
        "status": 0,
        "startDate": "2016-1-1",
        "children": []
      }]
    }, {
      "name": "Public Identity",
      "id": "PUBLIC_IDENTITY",
      "color": "purple-2",
      "desc": "Public identity desc",
      "daysCompleted": 42,
      "inProgress": 33,
      "planned": 25,
      "target": [
        "MESSAGING",
        "DS_SAFECOIN_WALLET_ADDRESS"
      ],
      "order": 5,
      "section": 2,
      "status": 1,
      "startDate": "2016-1-1",
      "children": [{
        "name": "DOWN_STREAM",
        "id": "DW_MANAGE_ACCOUNT",
        "source": "MANAGE_ACCOUNT",
        "color": "purple-3",
        "desc": "Manage account",
        "order": 999,
        "section": 1,
        "target": [
          "MPID_CREATE_MANAGE"
        ],
        "startDate": "2016-1-1"
      }, {
        "name": "DOWN_STREAM",
        "id": "DW_USAGE_SIMPLE_SEND_RECIEVE_TO_CONTACTS",
        "source": "USAGE_SIMPLE_SEND_RECIEVE_TO_CONTACTS",
        "color": "purple-3",
        "desc": "Usage simple send/recieve to contacts",
        "order": 999,
        "section": 1,
        "target": [
          "MANAGE_CONTACTS"
        ],
        "startDate": "2016-1-1"
      }, {
        "name": "MPID Create/Manage",
        "id": "MPID_CREATE_MANAGE",
        "color": "purple-3",
        "desc": "MPID Create/Manage desc",
        "daysCompleted": 42,
        "inProgress": 33,
        "planned": 25,
        "target": [
          "MANAGE_CONTACTS"
        ],
        "order": 1,
        "section": 1,
        "status": 0,
        "startDate": "2016-1-1",
        "children": []
      }, {
        "name": "Manage Contacts",
        "id": "MANAGE_CONTACTS",
        "color": "purple-3",
        "desc": "Manage Contacts desc",
        "daysCompleted": 42,
        "inProgress": 33,
        "planned": 25,
        "target": [
          "END"
        ],
        "order": 2,
        "section": 2,
        "status": 0,
        "startDate": "2016-1-1",
        "children": []
      }]
    }, {
      "name": "Messaging",
      "id": "MESSAGING",
      "color": "navy-2",
      "desc": "Messaging desc",
      "daysCompleted": 42,
      "inProgress": 33,
      "planned": 25,
      "target": [
        "PAY_THE_PRODUCT",
        "SMART_CONTRACT",
        "DS_AGGREGATE_USER_RATING"
      ],
      "order": 4,
      "section": 3,
      "status": 0,
      "startDate": "2016-1-1",
      "children": [{
        "name": "RFC",
        "id": "RFC",
        "color": "navy-3",
        "desc": "RFC desc",
        "daysCompleted": 42,
        "inProgress": 33,
        "planned": 25,
        "target": [
          "SYSTEM_LEVEL_MESSAGING_FOR_SAFECOIN"
        ],
        "order": 1,
        "section": 1,
        "status": 0,
        "startDate": "2016-1-1",
        "children": []
      }, {
        "name": "System Level Messaging for Safecoin",
        "id": "SYSTEM_LEVEL_MESSAGING_FOR_SAFECOIN",
        "color": "navy-3",
        "desc": "System Level Messaging for Safecoin desc",
        "daysCompleted": 42,
        "inProgress": 33,
        "planned": 25,
        "target": [
          "END"
        ],
        "order": 2,
        "section": 2,
        "status": 0,
        "startDate": "2016-1-1",
        "children": []
      }]
    }, {
      "name": "Safecoin",
      "id": "SAFECOIN",
      "color": "blue-2",
      "desc": "Safecoin desc",
      "daysCompleted": 42,
      "inProgress": 33,
      "planned": 25,
      "target": [
        "PAY_THE_PRODUCT",
        "SMART_CONTRACT"
      ],
      "order": 6,
      "section": 2,
      "status": 1,
      "startDate": "2016-1-1",
      "children": [{
        "name": "DOWN_STREAM",
        "id": "DW_SAFECOIN_WALLET_ADDRESS",
        "source": "SAFECOIN_WALLET_ADDRESS",
        "color": "navy-3",
        "desc": "Safecoin wallet address",
        "order": 999,
        "section": 1,
        "target": [
          "VAULT_SAFECOIN_CONFIG"
        ],
        "startDate": "2016-1-1"
      }, {
        "name": "DOWN_STREAM",
        "id": "DW_SAFECOIN_WALLET_ADDRESS",
        "source": "SAFECOIN_WALLET_ADDRESS",
        "color": "navy-3",
        "desc": "Safecoin wallet address",
        "order": 999,
        "section": 1,
        "target": [
          "FARMING"
        ],
        "startDate": "2016-1-1"
      }, {
        "name": "EXTERNAL",
        "id": "DW_MANAGE_CONTACTS",
        "source": "MANAGE_CONTACTS",
        "color": "purple-3",
        "desc": "Manage contacts",
        "order": -1,
        "section": 1,
        "target": [
          "USAGE_SIMPLE_SEND_RECIEVE_TO_CONTACTS"
        ],
        "startDate": "2016-1-1"
      }, {
        "name": "Vault - Safecoin Config",
        "id": "VAULT_SAFECOIN_CONFIG",
        "color": "navy-3",
        "desc": "Vault - Safecoin Config desc",
        "daysCompleted": 42,
        "inProgress": 33,
        "planned": 25,
        "target": [
          "FARMING"
        ],
        "order": 1,
        "section": 1,
        "status": 0,
        "startDate": "2016-1-1",
        "children": []
      }, {
        "name": "Farming",
        "id": "FARMING",
        "color": "navy-3",
        "desc": "Farming desc",
        "daysCompleted": 42,
        "inProgress": 33,
        "planned": 25,
        "target": [
          "USAGE_SIMPLE_SEND_RECIEVE_TO_CONTACTS"
        ],
        "order": 2,
        "section": 2,
        "status": 0,
        "startDate": "2016-1-1",
        "children": []
      }, {
        "name": "Usage - Simple Send/Recieve to Contacts",
        "id": "USAGE_SIMPLE_SEND_RECIEVE_TO_CONTACTS",
        "color": "navy-3",
        "desc": "Usage - Simple Send/Recieve to Contacts desc",
        "daysCompleted": 42,
        "inProgress": 33,
        "planned": 25,
        "target": [
          "TRADING"
        ],
        "order": 3,
        "section": 3,
        "status": 0,
        "startDate": "2016-1-1",
        "children": []
      }, {
        "name": "Trading",
        "id": "TRADING",
        "color": "navy-3",
        "desc": "Trading desc",
        "daysCompleted": 42,
        "inProgress": 33,
        "planned": 25,
        "target": [
          "END"
        ],
        "order": 4,
        "section": 4,
        "status": 0,
        "startDate": "2016-1-1",
        "children": []
      }]
    }, {
      "name": "System Update Management",
      "id": "SYSTEM_UPDATE_MANAGEMENT",
      "color": "cyan-2",
      "desc": "System Update Management desc",
      "daysCompleted": 42,
      "inProgress": 33,
      "planned": 25,
      "target": [
        "END"
      ],
      "order": 7,
      "section": 2,
      "status": 0,
      "startDate": "2016-1-1",
      "children": []
    }, {
      "name": "Pay the Producer",
      "id": "PAY_THE_PRODUCT",
      "color": "teal-2",
      "desc": "Pay the Producer desc",
      "daysCompleted": 42,
      "inProgress": 33,
      "planned": 25,
      "target": [
        "END"
      ],
      "order": 6,
      "section": 4,
      "status": 2,
      "startDate": "2016-1-1",
      "children": []
    }, {
      "name": "Data Sharing",
      "id": "DATA_SHARING",
      "color": "green-2",
      "desc": "Data Sharing desc",
      "daysCompleted": 42,
      "inProgress": 33,
      "planned": 25,
      "target": [
        "END"
      ],
      "order": 8,
      "section": 2,
      "status": 1,
      "startDate": "2016-1-1",
      "children": [{
        "name": "Private Shares",
        "id": "PRIVATE_SHARES",
        "color": "green-3",
        "desc": "Private Shares desc",
        "daysCompleted": 42,
        "inProgress": 33,
        "planned": 25,
        "target": [
          "PUBLIC_SHARES"
        ],
        "order": 1,
        "section": 1,
        "status": 0,
        "startDate": "2016-1-1",
        "children": []
      }, {
        "name": "Public Shares",
        "id": "PUBLIC_SHARES",
        "color": "green-3",
        "desc": "Public Shares desc",
        "daysCompleted": 42,
        "inProgress": 33,
        "planned": 25,
        "target": [
          "OPEN_SHARES"
        ],
        "order": 2,
        "section": 2,
        "status": 0,
        "startDate": "2016-1-1",
        "children": []
      }, {
        "name": "Open Shares",
        "id": "OPEN_SHARES",
        "color": "green-3",
        "desc": "Open Shares desc",
        "daysCompleted": 42,
        "inProgress": 33,
        "planned": 25,
        "target": [
          "END"
        ],
        "order": 3,
        "section": 3,
        "status": 0,
        "startDate": "2016-1-1",
        "children": []
      }]
    }, {
      "name": "Smart Contracts",
      "id": "SMART_CONTRACT",
      "color": "tangerine-2",
      "desc": "Smart Contracts desc",
      "daysCompleted": 42,
      "inProgress": 33,
      "planned": 25,
      "target": [
        "COMPUTATION_HANDLING_IN_NETWORK"
      ],
      "order": 7,
      "section": 4,
      "status": 1,
      "startDate": "2016-1-1",
      "children": []
    }, {
      "name": "Vault in mobile",
      "id": "VAULT_IN_MOBILE",
      "color": "orange-2",
      "desc": "Vault in mobile desc",
      "daysCompleted": 42,
      "inProgress": 33,
      "planned": 25,
      "target": [
        "VAULT_SUPPORT_EMBEDDED"
      ],
      "order": 4,
      "section": 2,
      "status": 1,
      "startDate": "2016-1-1",
      "children": []
    }, {
      "name": "Vault support embedded",
      "id": "VAULT_SUPPORT_EMBEDDED",
      "color": "brown-2",
      "desc": "Vault support embedded desc",
      "daysCompleted": 42,
      "inProgress": 33,
      "planned": 25,
      "target": [
        "END"
      ],
      "order": 3,
      "section": 3,
      "status": 1,
      "startDate": "2016-1-1",
      "children": []
    }, {
      "name": "Computation Handling in Network",
      "id": "COMPUTATION_HANDLING_IN_NETWORK",
      "color": "charcoal-2",
      "desc": "Computation Handling in Network desc",
      "daysCompleted": 42,
      "inProgress": 33,
      "planned": 25,
      "target": [
        "END"
      ],
      "order": 5,
      "section": 5,
      "status": 1,
      "startDate": "2016-1-1",
      "children": []
    }]
  }, {
    "name": "App",
    "id": "APP",
    "color": "grey-2",
    "desc": "App desc",
    "daysCompleted": 42,
    "inProgress": 33,
    "planned": 25,
    "target": [
      "END"
    ],
    "order": 2,
    "section": 1,
    "status": 0,
    "startDate": "2016-1-1",
    "children": [{
      "name": "Launcher",
      "id": "LAUNCHER",
      "color": "moss-2",
      "desc": "Launcher desc",
      "daysCompleted": 42,
      "inProgress": 33,
      "planned": 25,
      "target": [
        "FIREFOX_BROWSER_ADDON"
      ],
      "order": 1,
      "section": 1,
      "status": 1,
      "startDate": "2016-1-1",
      "children": [{
        "name": "EXTERNAL",
        "id": "EX_VAULT",
        "source": "VAULT",
        "color": "moss-2",
        "desc": "Vault desc",
        "order": -1,
        "section": 1,
        "target": [
          "APP_SELF_AUTHENTICATION"
        ],
        "startDate": "2016-1-1"
      }, {
        "name": "EXTERNAL",
        "id": "EX_VAULT_CONFIG",
        "source": "VAULT_CONFIG",
        "color": "pink-2",
        "desc": "Vault config desc",
        "order": -1,
        "section": 1,
        "target": [
          "VAULT_MANAGEMENT"
        ],
        "startDate": "2016-1-1"
      }, {
        "name": "Self Authentication",
        "id": "APP_SELF_AUTHENTICATION",
        "color": "moss-3",
        "desc": "Launcher desc",
        "daysCompleted": 42,
        "inProgress": 33,
        "planned": 25,
        "target": [
          "APP_MANAGEMENT"
        ],
        "order": 1,
        "section": 2,
        "status": 1,
        "startDate": "2016-1-1",
        "children": [{
          "name": "EXTERNAL",
          "id": "EX_MPID_CREATE_MANAGE",
          "source": "MPID_CREATE_MANAGE",
          "color": "purple-3",
          "desc": "MPID create/manage",
          "order": -1,
          "section": 1,
          "target": [
            "MANAGE_ACCOUNT"
          ],
          "startDate": "2016-1-1"
        }, {
          "name": "Create Account",
          "id": "CREATE_ACCOUNT",
          "color": "moss-4",
          "desc": "Create Account desc",
          "daysCompleted": 42,
          "inProgress": 33,
          "planned": 25,
          "target": [
            "MANAGE_ACCOUNT"
          ],
          "order": 1,
          "section": 1,
          "status": 1,
          "startDate": "2016-1-1",
          "children": []
        }, {
          "name": "Manage Account",
          "id": "MANAGE_ACCOUNT",
          "color": "moss-4",
          "desc": "Manage Account desc",
          "daysCompleted": 42,
          "inProgress": 33,
          "planned": 25,
          "target": [
            "END"
          ],
          "order": 2,
          "section": 2,
          "status": 1,
          "startDate": "2016-1-1",
          "children": []
        }]
      }, {
        "name": "App Management",
        "id": "APP_MANAGEMENT",
        "color": "moss-3",
        "desc": "Launcher desc",
        "daysCompleted": 42,
        "inProgress": 33,
        "planned": 25,
        "target": [
          "LAUNCHER_APP_API"
        ],
        "order": 2,
        "section": 3,
        "status": 1,
        "startDate": "2016-1-1",
        "children": [{
          "name": "Provide SAFE Drive access to authenticated apps",
          "id": "PROVIDE_SAFE_DRIVE_ACCESS",
          "color": "moss-4",
          "desc": "Provide SAFE Drive access desc",
          "daysCompleted": 42,
          "inProgress": 33,
          "planned": 25,
          "target": [
            "ADD_OR_REMOVE_APP"
          ],
          "order": 1,
          "section": 1,
          "status": 1,
          "startDate": "2016-1-1",
          "children": []
        }, {
          "name": "add/remove App",
          "id": "ADD_OR_REMOVE_APP",
          "color": "moss-4",
          "desc": "add/remove App desc",
          "daysCompleted": 42,
          "inProgress": 33,
          "planned": 25,
          "target": [
            "LAUNCH_APP"
          ],
          "order": 2,
          "section": 2,
          "status": 1,
          "startDate": "2016-1-1",
          "children": []
        }, {
          "name": "Launch App",
          "id": "LAUNCH_APP",
          "color": "moss-4",
          "desc": "Launch App desc",
          "daysCompleted": 42,
          "inProgress": 33,
          "planned": 25,
          "target": [
            "END"
          ],
          "order": 3,
          "section": 3,
          "status": 1,
          "startDate": "2016-1-1",
          "children": []
        }]
      }, {
        "name": "Cross Platfrom Desktop CLI client",
        "id": "CROSS_PLATFROM_DESKTOP_CLI_CLIENT",
        "color": "moss-3",
        "desc": "Launcher desc",
        "daysCompleted": 42,
        "inProgress": 33,
        "planned": 25,
        "target": [
          "LAUNCHER_UI"
        ],
        "order": 2,
        "section": 2,
        "status": 1,
        "startDate": "2016-1-1",
        "children": []
      }, {
        "name": "Launcher UI",
        "id": "LAUNCHER_UI",
        "color": "moss-3",
        "desc": "Launcher UI desc",
        "daysCompleted": 42,
        "inProgress": 33,
        "planned": 25,
        "target": [
          "LAUNCHER_APP_API"
        ],
        "order": 3,
        "section": 3,
        "status": 1,
        "startDate": "2016-1-1",
        "children": [{
          "name": "DOWN_STREAM",
          "id": "DW_APP_SPECIFIC_GRANULARITY",
          "source": "APP_SPECIFIC_GRANULARITY",
          "color": "moss-4",
          "desc": "APP SPECIFIC GRANULARITY",
          "order": 999,
          "section": 1,
          "target": [
            "VANILLA_SELF_AUTH_NABAGE_APPS"
          ],
          "startDate": "2016-1-1"
        }, {
          "name": "Vanilla - Self Auth, Nabage Apps",
          "id": "VANILLA_SELF_AUTH_NABAGE_APPS",
          "color": "moss-4",
          "desc": "Vanilla - Self Auth, Nabage Apps (Add/Remove/SAFE Drive Access) desc",
          "daysCompleted": 42,
          "inProgress": 33,
          "planned": 25,
          "target": [
            "LAUNCHER_TUTORIALS"
          ],
          "order": 1,
          "section": 1,
          "status": 1,
          "startDate": "2016-1-1",
          "children": []
        }, {
          "name": "Tutorials",
          "id": "LAUNCHER_TUTORIALS",
          "color": "moss-4",
          "desc": "Launcher Tutorials desc",
          "daysCompleted": 42,
          "inProgress": 33,
          "planned": 25,
          "target": [
            "APP_ANALYTICS_UI"
          ],
          "order": 2,
          "section": 2,
          "status": 1,
          "startDate": "2016-1-1",
          "children": []
        }, {
          "name": "App analytics UI",
          "id": "APP_ANALYTICS_UI",
          "color": "moss-4",
          "desc": "App analytics UI desc",
          "daysCompleted": 42,
          "inProgress": 33,
          "planned": 25,
          "target": [
            "VAULT_MANAGEMENT_UI"
          ],
          "order": 3,
          "section": 3,
          "status": 1,
          "startDate": "2016-1-1",
          "children": []
        }, {
          "name": "Vault Management UI",
          "id": "VAULT_MANAGEMENT_UI",
          "color": "moss-4",
          "desc": "Vault Management UI desc",
          "daysCompleted": 42,
          "inProgress": 33,
          "planned": 25,
          "target": [
            "FARMING_RATE_HISTORY_UI"
          ],
          "order": 4,
          "section": 4,
          "status": 1,
          "startDate": "2016-1-1",
          "children": []
        }, {
          "name": "Farming Rate History UI",
          "id": "FARMING_RATE_HISTORY_UI",
          "color": "moss-4",
          "desc": "Farming Rate History UI desc",
          "daysCompleted": 42,
          "inProgress": 33,
          "planned": 25,
          "target": [
            "VAULT_ANALYTICS_UI"
          ],
          "order": 5,
          "section": 5,
          "status": 1,
          "startDate": "2016-1-1",
          "children": []
        }, {
          "name": "Vault Analytics UI",
          "id": "VAULT_ANALYTICS_UI",
          "color": "moss-4",
          "desc": "Vault Analytics UI desc",
          "daysCompleted": 42,
          "inProgress": 33,
          "planned": 25,
          "target": [
            "APP_SUGGESTIONS"
          ],
          "order": 6,
          "section": 6,
          "status": 1,
          "startDate": "2016-1-1",
          "children": []
        }, {
          "name": "App suggestions",
          "id": "APP_SUGGESTIONS",
          "color": "moss-4",
          "desc": "App suggestions desc",
          "daysCompleted": 42,
          "inProgress": 33,
          "planned": 25,
          "target": [
            "END"
          ],
          "order": 7,
          "section": 7,
          "status": 1,
          "startDate": "2016-1-1",
          "children": []
        }]
      }, {
        "name": "Launcher App API",
        "id": "LAUNCHER_APP_API",
        "color": "moss-3",
        "desc": "Launcher App API desc",
        "daysCompleted": 42,
        "inProgress": 33,
        "planned": 25,
        "target": [
          "APP_INSTALLER"
        ],
        "order": 3,
        "section": 4,
        "status": 1,
        "startDate": "2016-1-1",
        "children": [{
          "name": "NFS",
          "id": "NFS",
          "color": "moss-4",
          "desc": "NFS desc",
          "daysCompleted": 42,
          "inProgress": 33,
          "planned": 25,
          "target": [
            "DNS"
          ],
          "order": 1,
          "section": 1,
          "status": 1,
          "startDate": "2016-1-1",
          "children": [{
            "name": "Sandbox",
            "id": "NFS_SANDBOX",
            "color": "moss-5",
            "desc": "Sandbox desc",
            "daysCompleted": 42,
            "inProgress": 33,
            "planned": 25,
            "target": [
              "NFS_SHARED_ACCESS"
            ],
            "order": 1,
            "section": 1,
            "status": 1,
            "startDate": "2016-1-1",
            "children": []
          }, {
            "name": "Shared Folder Access to SAFE Drive",
            "id": "NFS_SHARED_ACCESS",
            "color": "moss-5",
            "desc": "Shared Folder Access to SAFE Drive desc",
            "daysCompleted": 42,
            "inProgress": 33,
            "planned": 25,
            "target": [
              "END"
            ],
            "order": 2,
            "section": 2,
            "status": 1,
            "startDate": "2016-1-1",
            "children": []
          }]
        }, {
          "name": "DNS",
          "id": "DNS",
          "color": "moss-4",
          "desc": "DNS desc",
          "daysCompleted": 42,
          "inProgress": 33,
          "planned": 25,
          "target": [
            "END"
          ],
          "order": 2,
          "section": 2,
          "status": 1,
          "startDate": "2016-1-1",
          "children": []
        }]
      }, {
        "name": "Installer",
        "id": "APP_INSTALLER",
        "color": "moss-3",
        "desc": "Launcher App API desc",
        "daysCompleted": 42,
        "inProgress": 33,
        "planned": 25,
        "target": [
          "APP_ANALYTICS"
        ],
        "order": 4,
        "section": 5,
        "status": 1,
        "startDate": "2016-1-1",
        "children": [{
          "name": "Cross Platform Launcher Installer",
          "id": "CROSS_PLATFORM_LAUNCHER_INSTALLER",
          "color": "moss-4",
          "desc": "Cross Platform Launcher Installer desc",
          "daysCompleted": 42,
          "inProgress": 33,
          "planned": 25,
          "target": [
            "VAULT_BINARY_BUNDLED"
          ],
          "order": 1,
          "section": 1,
          "status": 1,
          "startDate": "2016-1-1",
          "children": []
        }, {
          "name": "Vault Binary Bundled",
          "id": "VAULT_BINARY_BUNDLED",
          "color": "moss-4",
          "desc": "Vault Binary Bundled desc",
          "daysCompleted": 42,
          "inProgress": 33,
          "planned": 25,
          "target": [
            "END"
          ],
          "order": 2,
          "section": 2,
          "status": 1,
          "startDate": "2016-1-1",
          "children": []
        }]
      }, {
        "name": "App Analytics",
        "id": "APP_ANALYTICS",
        "color": "moss-3",
        "desc": "App Analytics desc",
        "daysCompleted": 42,
        "inProgress": 33,
        "planned": 25,
        "target": [
          "END"
        ],
        "order": 5,
        "section": 6,
        "status": 1,
        "startDate": "2016-1-1",
        "children": [{
          "name": "EXTERNAL",
          "id": "DW_VANILLA_SELF_AUTH_NABAGE_APPS  ",
          "source": "VANILLA_SELF_AUTH_NABAGE_APPS",
          "color": "moss-4",
          "desc": "Vanilla self auth nabage apps",
          "order": -1,
          "section": 1,
          "target": [
            "APP_SPECIFIC_GRANULARITY"
          ],
          "startDate": "2016-1-1"
        }, {
          "name": "Data Throughput from IPC apps",
          "id": "DATA_THROUGHPUT_FROM_IPC_APPS",
          "color": "moss-4",
          "desc": "Data Throughput from IPC apps desc",
          "daysCompleted": 42,
          "inProgress": 33,
          "planned": 25,
          "target": [
            "APP_SPECIFIC_GRANULARITY"
          ],
          "order": 1,
          "section": 1,
          "status": 1,
          "startDate": "2016-1-1",
          "children": []
        }, {
          "name": "App Specific Granularity",
          "id": "APP_SPECIFIC_GRANULARITY",
          "color": "moss-4",
          "desc": "App Specific Granularity desc",
          "daysCompleted": 42,
          "inProgress": 33,
          "planned": 25,
          "target": [
            "END"
          ],
          "order": 2,
          "section": 2,
          "status": 1,
          "startDate": "2016-1-1",
          "children": []
        }]
      }, {
        "name": "Vault Management",
        "id": "VAULT_MANAGEMENT",
        "color": "moss-3",
        "desc": "Vault Management desc",
        "daysCompleted": 42,
        "inProgress": 33,
        "planned": 25,
        "target": [
          "FARMING_RATE_HISTORY"
        ],
        "order": 6,
        "section": 6,
        "status": 1,
        "startDate": "2016-1-1",
        "children": [{
          "name": "EXTERNAL",
          "id": "EX_PUBLIC_IDENTITY",
          "source": "PUBLIC_IDENTITY",
          "color": "purple-2",
          "desc": "Public identity",
          "order": -1,
          "section": 3,
          "target": [
            "SAFECOIN_WALLET_ADDRESS"
          ],
          "startDate": "2016-1-1"
        }, {
          "name": "EXTERNAL",
          "id": "EX_VAULT_SAFECOIN_CONFIG",
          "source": "VAULT_SAFECOIN_CONFIG",
          "color": "navy-3",
          "desc": "Vault safecoin config",
          "order": -1,
          "section": 3,
          "target": [
            "SAFECOIN_WALLET_ADDRESS"
          ],
          "startDate": "2016-1-1"
        }, {
          "name": "EXTERNAL",
          "id": "EX_FARMING",
          "source": "FARMING",
          "color": "navy-3",
          "desc": "Farming",
          "order": -1,
          "section": 3,
          "target": [
            "SAFECOIN_WALLET_ADDRESS"
          ],
          "startDate": "2016-1-1"
        }, {
          "name": "Manage Vault Config",
          "id": "MANAGE_VAULT_CONFIG",
          "color": "moss-4",
          "desc": "Manage Vault Config desc",
          "daysCompleted": 42,
          "inProgress": 33,
          "planned": 25,
          "target": [
            "SAFECOIN_WALLET_ADDRESS"
          ],
          "order": 1,
          "section": 1,
          "status": 1,
          "startDate": "2016-1-1",
          "children": []
        }, {
          "name": "Safecoin Wallet Address",
          "id": "SAFECOIN_WALLET_ADDRESS",
          "color": "moss-4",
          "desc": "Safecoin Wallet Address desc",
          "daysCompleted": 42,
          "inProgress": 33,
          "planned": 25,
          "target": [
            "CONTROL_VAULT"
          ],
          "order": 3,
          "section": 2,
          "status": 1,
          "startDate": "2016-1-1",
          "children": []
        }, {
          "name": "Control Vault",
          "id": "CONTROL_VAULT",
          "color": "moss-4",
          "desc": "Control Vault  - start/Stop/remove/Update info desc",
          "daysCompleted": 42,
          "inProgress": 33,
          "planned": 25,
          "target": [
            "END"
          ],
          "order": 4,
          "section": 3,
          "status": 1,
          "startDate": "2016-1-1",
          "children": []
        }]
      }, {
        "name": "Farming Rate History",
        "id": "FARMING_RATE_HISTORY",
        "color": "moss-3",
        "desc": "Farming Rate History desc",
        "daysCompleted": 42,
        "inProgress": 33,
        "planned": 25,
        "target": [
          "VAULT_ANALYTICS"
        ],
        "order": 7,
        "section": 7,
        "status": 1,
        "startDate": "2016-1-1",
        "children": []
      }, {
        "name": "Vault Analytics",
        "id": "VAULT_ANALYTICS",
        "color": "moss-3",
        "desc": "Vault Analytics desc",
        "daysCompleted": 42,
        "inProgress": 33,
        "planned": 25,
        "target": [
          "END"
        ],
        "order": 8,
        "section": 8,
        "status": 1,
        "startDate": "2016-1-1",
        "children": [{
          "name": "Data throughput from vaults",
          "id": "DATA_THROUGHPUT_FROM_VAULTS",
          "color": "moss-4",
          "desc": "Data throughput from vaults desc",
          "daysCompleted": 42,
          "inProgress": 33,
          "planned": 25,
          "target": [
            "VAULT_SPECIFIC_GRANULARITY"
          ],
          "order": 1,
          "section": 1,
          "status": 1,
          "startDate": "2016-1-1",
          "children": []
        }, {
          "name": "Vault specific granularity",
          "id": "VAULT_SPECIFIC_GRANULARITY",
          "color": "moss-4",
          "desc": "Vault specific granularity desc",
          "daysCompleted": 42,
          "inProgress": 33,
          "planned": 25,
          "target": [
            "SAFECOIN_FARMING_HISTORY"
          ],
          "order": 2,
          "section": 2,
          "status": 1,
          "startDate": "2016-1-1",
          "children": []
        }, {
          "name": "Safecoin Farming history",
          "id": "SAFECOIN_FARMING_HISTORY",
          "color": "moss-4",
          "desc": "Safecoin Farming history desc",
          "daysCompleted": 42,
          "inProgress": 33,
          "planned": 25,
          "target": [
            "END"
          ],
          "order": 3,
          "section": 3,
          "status": 1,
          "startDate": "2016-1-1",
          "children": []
        }]
      }, {
        "name": "Portable App Store",
        "id": "PORTABLE_APP_STORE",
        "color": "moss-3",
        "desc": "Portable App Store desc",
        "daysCompleted": 42,
        "inProgress": 33,
        "planned": 25,
        "target": [
          "END"
        ],
        "order": 9,
        "section": 8,
        "status": 1,
        "startDate": "2016-1-1",
        "children": [{
          "name": "EXTERNAL",
          "id": "EX_MESSAGING",
          "source": "MESSAGING",
          "color": "pink-2",
          "desc": "Messaging",
          "order": -1,
          "section": 3,
          "target": [
            "AGGREGATE_USER_RATINGS"
          ],
          "startDate": "2016-1-1"
        }, {
          "name": "Manage Portable Apps from Network Share",
          "id": "MANAGE_PORTABLE_APPS",
          "color": "moss-4",
          "desc": "Manage Portable Apps from Network Share desc",
          "daysCompleted": 42,
          "inProgress": 33,
          "planned": 25,
          "target": [
            "CROSS_PLATFORM_SUPPORT"
          ],
          "order": 1,
          "section": 1,
          "status": 1,
          "startDate": "2016-1-1",
          "children": []
        }, {
          "name": "Cross Platform Support",
          "id": "CROSS_PLATFORM_SUPPORT",
          "color": "moss-4",
          "desc": "Cross Platform Support desc",
          "daysCompleted": 42,
          "inProgress": 33,
          "planned": 25,
          "target": [
            "AGGREGATE_USER_RATINGS"
          ],
          "order": 2,
          "section": 2,
          "status": 1,
          "startDate": "2016-1-1",
          "children": []
        }, {
          "name": "Aggregate User ratings specific to apps",
          "id": "AGGREGATE_USER_RATINGS",
          "color": "moss-4",
          "desc": "Aggregate User ratings specific to apps desc",
          "daysCompleted": 42,
          "inProgress": 33,
          "planned": 25,
          "target": [
            "MANAGE_APP_FEEDBACK"
          ],
          "order": 3,
          "section": 3,
          "status": 1,
          "startDate": "2016-1-1",
          "children": []
        }, {
          "name": "Manage app feedback",
          "id": "MANAGE_APP_FEEDBACK",
          "color": "moss-4",
          "desc": "Manage app feedback desc",
          "daysCompleted": 42,
          "inProgress": 33,
          "planned": 25,
          "target": [
            "END"
          ],
          "order": 4,
          "section": 4,
          "status": 1,
          "startDate": "2016-1-1",
          "children": []
        }]
      }]
    }, {
      "name": "Firefox Browser Addon",
      "id": "FIREFOX_BROWSER_ADDON",
      "color": "pink-2",
      "desc": "Firefox Browser Addon desc",
      "daysCompleted": 42,
      "inProgress": 33,
      "planned": 25,
      "target": [
        "STORAGE_APP"
      ],
      "order": 2,
      "section": 2,
      "status": 1,
      "startDate": "2016-1-1",
      "children": [{
        "name": "Launcher Api Access",
        "id": "LAUNCHER_API_ACCESS",
        "color": "pink-3",
        "desc": "Launcher Api Access (restricted to anonymous actions) desc",
        "daysCompleted": 42,
        "inProgress": 33,
        "planned": 25,
        "target": [
          "FFI_BINDING_TO_SAFE_CORE_MODULES"
        ],
        "order": 1,
        "section": 1,
        "status": 1,
        "startDate": "2016-1-1",
        "children": []
      }, {
        "name": "FFI Binding to SAFE core Modules",
        "id": "FFI_BINDING_TO_SAFE_CORE_MODULES",
        "color": "pink-3",
        "desc": "FFI Binding to SAFE core Modules (Unrestricted actions with basic authentication) desc",
        "daysCompleted": 42,
        "inProgress": 33,
        "planned": 25,
        "target": [
          "LAUNCHER_API_ACCESS_UNRESTRICTED"
        ],
        "order": 2,
        "section": 2,
        "status": 1,
        "startDate": "2016-1-1",
        "children": []
      }, {
        "name": "Launcher API Access",
        "id": "LAUNCHER_API_ACCESS_UNRESTRICTED",
        "color": "pink-3",
        "desc": "Launcher API Access (Unrestricted Access) desc",
        "daysCompleted": 42,
        "inProgress": 33,
        "planned": 25,
        "target": [
          "VIEW_PUBLIC_STATES"
        ],
        "order": 3,
        "section": 3,
        "status": 1,
        "startDate": "2016-1-1",
        "children": []
      }, {
        "name": "View Public States",
        "id": "VIEW_PUBLIC_STATES",
        "color": "pink-3",
        "desc": "View Public States desc",
        "daysCompleted": 42,
        "inProgress": 33,
        "planned": 25,
        "target": [
          "BROSWER_SUPPORT"
        ],
        "order": 4,
        "section": 4,
        "status": 1,
        "startDate": "2016-1-1",
        "children": []
      }, {
        "name": "Broswer Support",
        "id": "BROSWER_SUPPORT",
        "color": "pink-3",
        "desc": "Broswer Support desc",
        "daysCompleted": 42,
        "inProgress": 33,
        "planned": 25,
        "target": [
          "END"
        ],
        "order": 5,
        "section": 5,
        "status": 1,
        "startDate": "2016-1-1",
        "children": [{
          "name": "Chrome",
          "id": "CHROME_BROWSER",
          "color": "pink-4",
          "desc": "Chrome desc",
          "daysCompleted": 42,
          "inProgress": 33,
          "planned": 25,
          "target": [
            "FIREFOX_BROWSER"
          ],
          "order": 1,
          "section": 1,
          "status": 1,
          "startDate": "2016-1-1",
          "children": []
        }, {
          "name": "Firefox",
          "id": "FIREFOX_BROWSER",
          "color": "pink-4",
          "desc": "Firefox desc",
          "daysCompleted": 42,
          "inProgress": 33,
          "planned": 25,
          "target": [
            "END"
          ],
          "order": 2,
          "section": 2,
          "status": 1,
          "startDate": "2016-1-1",
          "children": []
        }]
      }]
    }, {
      "name": "Storage App",
      "id": "STORAGE_APP",
      "color": "purple-2",
      "desc": "Storage App desc",
      "daysCompleted": 42,
      "inProgress": 33,
      "planned": 25,
      "target": [
        "APP_MESSAGING"
      ],
      "order": 3,
      "section": 3,
      "status": 1,
      "startDate": "2016-1-1",
      "children": [{
        "name": "Simple app with Network data access",
        "id": "SIMPLE_APP_WITH_NETWORK_DATA_ACCESS",
        "color": "purple-3",
        "desc": "Simple notepad / Calendar with Network data access desc",
        "daysCompleted": 42,
        "inProgress": 33,
        "planned": 25,
        "target": [
          "VFS_PRIVATE_DATA"
        ],
        "order": 1,
        "section": 1,
        "status": 1,
        "startDate": "2016-1-1",
        "children": []
      }, {
        "name": "VFS - Private Data",
        "id": "VFS_PRIVATE_DATA",
        "color": "purple-3",
        "desc": "VFS - Private Data desc",
        "daysCompleted": 42,
        "inProgress": 33,
        "planned": 25,
        "target": [
          "VFS_SHARES"
        ],
        "order": 2,
        "section": 2,
        "status": 1,
        "startDate": "2016-1-1",
        "children": []
      }, {
        "name": "VFS - Shares",
        "id": "VFS_SHARES",
        "color": "purple-3",
        "desc": "VFS - Shares desc",
        "daysCompleted": 42,
        "inProgress": 33,
        "planned": 25,
        "target": [
          "VFS_VERSIONED"
        ],
        "order": 3,
        "section": 3,
        "status": 1,
        "startDate": "2016-1-1",
        "children": []
      }, {
        "name": "VFS - versioned",
        "id": "VFS_VERSIONED",
        "color": "purple-3",
        "desc": "Launcher desc",
        "daysCompleted": 42,
        "inProgress": 33,
        "planned": 25,
        "target": [
          "MEDIA_GALLERY"
        ],
        "order": 4,
        "section": 4,
        "status": 1,
        "startDate": "2016-1-1",
        "children": []
      }, {
        "name": "Media Gallery (images)",
        "id": "MEDIA_GALLERY",
        "color": "purple-3",
        "desc": "Media Gallery (images) desc",
        "daysCompleted": 42,
        "inProgress": 33,
        "planned": 25,
        "target": [
          "STREAMING_AUDIO"
        ],
        "order": 5,
        "section": 5,
        "status": 1,
        "startDate": "2016-1-1",
        "children": []
      }, {
        "name": "Streaming Audio",
        "id": "STREAMING_AUDIO",
        "color": "purple-3",
        "desc": "Streaming Audio desc",
        "daysCompleted": 42,
        "inProgress": 33,
        "planned": 25,
        "target": [
          "STREAMING_VIDEO"
        ],
        "order": 6,
        "section": 6,
        "status": 1,
        "startDate": "2016-1-1",
        "children": []
      }, {
        "name": "Streaming Video",
        "id": "STREAMING_VIDEO",
        "color": "purple-3",
        "desc": "Streaming Video desc",
        "daysCompleted": 42,
        "inProgress": 33,
        "planned": 25,
        "target": [
          "END"
        ],
        "order": 7,
        "section": 7,
        "status": 1,
        "startDate": "2016-1-1",
        "children": []
      }]
    }, {
      "name": "Messaging",
      "id": "APP_MESSAGING",
      "color": "navy-2",
      "desc": "Messaging desc",
      "daysCompleted": 42,
      "inProgress": 33,
      "planned": 25,
      "target": [
        "SAFECOIN_WALLET"
      ],
      "order": 4,
      "section": 4,
      "status": 1,
      "startDate": "2016-1-1",
      "children": [{
        "name": "Public Identity Mangement",
        "id": "PUBLIC_IDENTITY_MANGEMENT",
        "color": "navy-3",
        "desc": "Public Identity Mangement desc",
        "daysCompleted": 42,
        "inProgress": 33,
        "planned": 25,
        "target": [
          "CONTACT_MANAGEMENT"
        ],
        "order": 1,
        "section": 1,
        "status": 1,
        "startDate": "2016-1-1",
        "children": []
      }, {
        "name": "Contact Management",
        "id": "CONTACT_MANAGEMENT",
        "color": "navy-3",
        "desc": "Contact Management desc",
        "daysCompleted": 42,
        "inProgress": 33,
        "planned": 25,
        "target": [
          "TEXT_MESSAGING"
        ],
        "order": 2,
        "section": 2,
        "status": 1,
        "startDate": "2016-1-1",
        "children": []
      }, {
        "name": "Text Messaging",
        "id": "TEXT_MESSAGING",
        "color": "navy-3",
        "desc": "Text Messaging desc",
        "daysCompleted": 42,
        "inProgress": 33,
        "planned": 25,
        "target": [
          "VOICE_MESSAGING"
        ],
        "order": 3,
        "section": 3,
        "status": 1,
        "startDate": "2016-1-1",
        "children": []
      }, {
        "name": "Voice Messaging",
        "id": "VOICE_MESSAGING",
        "color": "navy-3",
        "desc": "Voice Messaging desc",
        "daysCompleted": 42,
        "inProgress": 33,
        "planned": 25,
        "target": [
          "VIDEO_MESSAGING"
        ],
        "order": 4,
        "section": 4,
        "status": 1,
        "startDate": "2016-1-1",
        "children": []
      }, {
        "name": "Video Messaging",
        "id": "VIDEO_MESSAGING",
        "color": "navy-3",
        "desc": "Video Messaging desc",
        "daysCompleted": 42,
        "inProgress": 33,
        "planned": 25,
        "target": [
          "SEND_OR_RECEIVE_NETWORK_FILES"
        ],
        "order": 5,
        "section": 5,
        "status": 1,
        "startDate": "2016-1-1",
        "children": []
      }, {
        "name": "Send/receive Network Files",
        "id": "SEND_OR_RECEIVE_NETWORK_FILES",
        "color": "navy-3",
        "desc": "Send/receive Network Files desc",
        "daysCompleted": 42,
        "inProgress": 33,
        "planned": 25,
        "target": [
          "MESSAGING_SEND_OR_RECEIVE_SAFECOIN"
        ],
        "order": 6,
        "section": 6,
        "status": 1,
        "startDate": "2016-1-1",
        "children": []
      }, {
        "name": "Send/Receive Safecoin",
        "id": "MESSAGING_SEND_OR_RECEIVE_SAFECOIN",
        "color": "navy-3",
        "desc": "Send/Receive Safecoin desc",
        "daysCompleted": 42,
        "inProgress": 33,
        "planned": 25,
        "target": [
          "END"
        ],
        "order": 7,
        "section": 7,
        "status": 1,
        "startDate": "2016-1-1",
        "children": []
      }]
    }, {
      "name": "Safecoin Wallet",
      "id": "SAFECOIN_WALLET",
      "color": "blue-2",
      "desc": "Safecoin Wallet desc",
      "daysCompleted": 42,
      "inProgress": 33,
      "planned": 25,
      "target": [
        "SAFECOIN_EXCHANGE"
      ],
      "order": 5,
      "section": 5,
      "status": 1,
      "startDate": "2016-1-1",
      "children": [{
        "name": "Safecoin Balance",
        "id": "SAFECOIN_BALANCE",
        "color": "blue-3",
        "desc": "Safecoin Balance desc",
        "daysCompleted": 42,
        "inProgress": 33,
        "planned": 25,
        "target": [
          "TRANSACTION_HISTORY"
        ],
        "order": 1,
        "section": 1,
        "status": 1,
        "startDate": "2016-1-1",
        "children": []
      }, {
        "name": "Transaction History",
        "id": "TRANSACTION_HISTORY",
        "color": "blue-3",
        "desc": "Transaction History desc",
        "daysCompleted": 42,
        "inProgress": 33,
        "planned": 25,
        "target": [
          "SAFECOIN_WALLET_SEND_OR_RECEIVE_SAFECOIN"
        ],
        "order": 2,
        "section": 2,
        "status": 1,
        "startDate": "2016-1-1",
        "children": []
      }, {
        "name": "Send/Receive Safecoin",
        "id": "SAFECOIN_WALLET_SEND_OR_RECEIVE_SAFECOIN",
        "color": "blue-3",
        "desc": "Send/Receive Safecoin desc",
        "daysCompleted": 42,
        "inProgress": 33,
        "planned": 25,
        "target": [
          "SAFECOIN_WALLET_FARMING_RATE_HISTORY"
        ],
        "order": 3,
        "section": 3,
        "status": 1,
        "startDate": "2016-1-1",
        "children": [{
          "name": "Contacts",
          "id": "SAFECOIN_CONTACTS",
          "color": "blue-4",
          "desc": "Contacts desc",
          "daysCompleted": 42,
          "inProgress": 33,
          "planned": 25,
          "target": [
            "SAFECOIN_TO_PUBLIC_IDENTITIES"
          ],
          "order": 1,
          "section": 1,
          "status": 1,
          "startDate": "2016-1-1",
          "children": []
        }, {
          "name": "To public identities",
          "id": "SAFECOIN_TO_PUBLIC_IDENTITIES",
          "color": "blue-4",
          "desc": "To public identities desc",
          "daysCompleted": 42,
          "inProgress": 33,
          "planned": 25,
          "target": [
            "END"
          ],
          "order": 2,
          "section": 2,
          "status": 1,
          "startDate": "2016-1-1",
          "children": []
        }]
      }, {
        "name": "Farming Rate History",
        "id": "SAFECOIN_WALLET_FARMING_RATE_HISTORY",
        "color": "blue-3",
        "desc": "Farming Rate History desc",
        "daysCompleted": 42,
        "inProgress": 33,
        "planned": 25,
        "target": [
          "END"
        ],
        "order": 4,
        "section": 4,
        "status": 1,
        "startDate": "2016-1-1",
        "children": []
      }]
    }, {
      "name": "Safecoin Exchange",
      "id": "SAFECOIN_EXCHANGE",
      "color": "cyan-2",
      "desc": "Safecoin Exchange desc",
      "daysCompleted": 42,
      "inProgress": 33,
      "planned": 25,
      "target": [
        "CMS"
      ],
      "order": 6,
      "section": 6,
      "status": 1,
      "startDate": "2016-1-1",
      "children": [{
        "name": "Recent buyers/sellers",
        "id": "RECENT_BUYERS_OR_SELLERS",
        "color": "cyan-3",
        "desc": "Recent buyers/sellers desc",
        "daysCompleted": 42,
        "inProgress": 33,
        "planned": 25,
        "target": [
          "EXCHANGE_VIA_BTC"
        ],
        "order": 1,
        "section": 1,
        "status": 1,
        "startDate": "2016-1-1",
        "children": []
      }, {
        "name": "Exchange via BTC",
        "id": "EXCHANGE_VIA_BTC",
        "color": "cyan-3",
        "desc": "Exchange via BTC desc",
        "daysCompleted": 42,
        "inProgress": 33,
        "planned": 25,
        "target": [
          "SAFECOIN_EXCHANGE_SMART_CONTRACTS"
        ],
        "order": 2,
        "section": 2,
        "status": 1,
        "startDate": "2016-1-1",
        "children": [{
          "name": "Buy Safecoin",
          "id": "BUY_SAFECOIN",
          "color": "cyan-4",
          "desc": "Buy Safecoin desc",
          "daysCompleted": 42,
          "inProgress": 33,
          "planned": 25,
          "target": [
            "SELL_SAFECOIN"
          ],
          "order": 1,
          "section": 1,
          "status": 1,
          "startDate": "2016-1-1",
          "children": []
        }, {
          "name": "Sell Safecoin",
          "id": "SELL_SAFECOIN",
          "color": "cyan-4",
          "desc": "Sell Safecoin desc",
          "daysCompleted": 42,
          "inProgress": 33,
          "planned": 25,
          "target": [
            "END"
          ],
          "order": 2,
          "section": 2,
          "status": 1,
          "startDate": "2016-1-1",
          "children": []
        }]
      }, {
        "name": "Smart Contracts",
        "id": "SAFECOIN_EXCHANGE_SMART_CONTRACTS",
        "color": "cyan-3",
        "desc": "Smart Contracts desc",
        "daysCompleted": 42,
        "inProgress": 33,
        "planned": 25,
        "target": [
          "END"
        ],
        "order": 3,
        "section": 3,
        "status": 1,
        "startDate": "2016-1-1",
        "children": []
      }]
    }, {
      "name": "CMS",
      "id": "CMS",
      "color": "teal-2",
      "desc": "CMS desc",
      "daysCompleted": 42,
      "inProgress": 33,
      "planned": 25,
      "target": [
        "END"
      ],
      "order": 7,
      "section": 7,
      "status": 1,
      "startDate": "2016-1-1",
      "children": [{
        "name": "Standalone App",
        "id": "STANDALONE_APP",
        "color": "teal-3",
        "desc": "Standalone App desc",
        "daysCompleted": 42,
        "inProgress": 33,
        "planned": 25,
        "target": [
          "BROWSER_INTEGRATED"
        ],
        "order": 1,
        "section": 1,
        "status": 1,
        "startDate": "2016-1-1",
        "children": []
      }, {
        "name": "Browser Integrated",
        "id": "BROWSER_INTEGRATED",
        "color": "teal-3",
        "desc": "Browser Integrated desc",
        "daysCompleted": 42,
        "inProgress": 33,
        "planned": 25,
        "target": [
          "CREATE_STATIC_WEBSITES"
        ],
        "order": 2,
        "section": 2,
        "status": 1,
        "startDate": "2016-1-1",
        "children": []
      }, {
        "name": "Create Static Websites",
        "id": "CREATE_STATIC_WEBSITES",
        "color": "teal-3",
        "desc": "Create Static Websites desc",
        "daysCompleted": 42,
        "inProgress": 33,
        "planned": 25,
        "target": [
          "MANAGE_NETWORK_STORAGE"
        ],
        "order": 3,
        "section": 3,
        "status": 1,
        "startDate": "2016-1-1",
        "children": []
      }, {
        "name": "Manage Network Storage",
        "id": "MANAGE_NETWORK_STORAGE",
        "color": "teal-3",
        "desc": "Manage Network Storage desc",
        "daysCompleted": 42,
        "inProgress": 33,
        "planned": 25,
        "target": [
          "CROSS_MODULE_FEATURES"
        ],
        "order": 4,
        "section": 4,
        "status": 1,
        "startDate": "2016-1-1",
        "children": []
      }, {
        "name": "Cross module Features",
        "id": "CROSS_MODULE_FEATURES",
        "color": "teal-3",
        "desc": "Cross module Features desc",
        "daysCompleted": 42,
        "inProgress": 33,
        "planned": 25,
        "target": [
          "END"
        ],
        "order": 5,
        "section": 5,
        "status": 1,
        "startDate": "2016-1-1",
        "children": []
      }]
    }]
  }]
};

/**
 *
 */

