// Providers
// ----------------------------------------------------
// ----------------------------------------------------
// Storage

const NasEpfl = {
  Style: 'AmountRatesCost',
  Provider: 'EPFL-VPO-DSI',
  Name: 'NAS2023',
  Url: [{
    Name: 'DSI service description',
    Url: 'https://support.epfl.ch/help/epfl?id=epfl_service_status&service=49a363acdb34c700ef64731b8c96191f'
  }],
  ExtraInfo: '',
  ByYear: true,
  Adaptive: false,
  AmountName: 'Amount',
  AmountUnit: 'TB',
  AmountMin: 0,
  AmountMax: 1,
  AmountStep: 1,
  AmountFree: 1,
  AmountFreeCumulative: false,
  RateName: 'Performance',
  Rates: {
    Standard: 0
  },
  RateUnit: 'CHF / TB'
}

const RcpEpfl = {
  Style: 'AmountRatesCost',
  Provider: 'EPFL-VPA-RCP',
  Name: 'Collaborative Storage – NAS-RCP',
  Url: [{
    Name: 'RCP service description',
    Url: 'https://www.epfl.ch/research/facilities/rcp/collaborative-storage-nas-rcp-service-description/'
  }],
  ExtraInfo: '',
  ByYear: true,
  Adaptive: false,
  AmountName: 'Amount',
  AmountUnit: 'TB',
  AmountMin: 0,
  AmountMax: 25,
  AmountStep: 1,
  AmountFree: 0,
  AmountFreeCumulative: false,
  RateName: 'Performance',
  Rates: {
    Standard: 20.75
  },
  RateUnit: 'CHF / TB'
}

const ScitasEpfl = {
  Style: 'AmountRatesCost',
  Provider: 'EPFL-VPA-SCITAS',
  Name: 'Collaborative Storage – SCITAS',
  Url: [{
    Name: 'Service description',
    Url: 'https://scitas-doc.epfl.ch/accounts/prices/'
  }],
  ExtraInfo: 'SCITAS rates are provided as estimations only, the actual costs will be based on actual usage at the end of the year',
  ByYear: true,
  Adaptive: false,
  AmountName: 'Amount',
  AmountUnit: 'TB',
  AmountMin: 0,
  AmountMax: 25,
  AmountStep: 1,
  AmountFree: 0,
  AmountFreeCumulative: false,
  RateName: 'Performance',
  Rates: {
    'User fee 1 (for EPFL: direct costs only)': 13.1,
    'User fee 2 (incl. infrastructure maintenance': 67.7,
    'User fee 3 (incl. all direct and indirect costs': 78.6,
    'User fee 1 with backup': 21.9,
    'User fee 2 with backup': 109.8,
    'User fee 3 with backup': 127.0
  },
  RateUnit: 'CHF / TB'
}

const SwitchEpfl = {
  Style: 'CategoryCost',
  Provider: 'Switch',
  Name: 'Switchdrive',
  ByYear: true,
  Url: [{
    Name: 'Switch Website',
    Url: 'https://drive.switch.ch/'
  }],
  CatName: 'Options',
  Cat: {
    'Cloud Based max 50GB': 0
  },
  CatUnit: 'CHF'
}

const MsPersonalEpfl = {
  Style: 'CategoryCost',
  Provider: 'Microsoft OneDrive',
  Name: 'Microsoft M365 OneDrive',
  ByYear: true,
  Url: [{
    Name: 'Service description',
    Url: 'https://support.epfl.ch/epfl?id=epfl_kb_article_view&sysparm_article=KB0017390&sys_kb_id=44ce400f97b729142f9976971153af0c#mcetoc_1h4lngro134'
  }],
  CatName: 'Options',
  Cat: {
    'Individual storage 1TB': 0
  },
  CatUnit: 'CHF'
}

const MsSharedEpfl = {
  Style: 'AmountRatesCost',
  Provider: 'Microsoft SharePoint',
  Name: 'Microsoft M365 SharePoint',
  Url: [{
    Name: 'Service description',
    Url: 'https://support.epfl.ch/epfl?id=epfl_kb_article_view&sysparm_article=KB0017390&sys_kb_id=44ce400f97b729142f9976971153af0c#mcetoc_1h4lngro137'
  }],
  ByYear: true,
  Adaptive: false,
  AmountName: 'Amount',
  AmountUnit: 'TB',
  AmountMin: 0,
  AmountMax: 25,
  AmountStep: 1,
  AmountFree: 1,
  RateName: 'Standard',
  Rates: {
    Standard: 0
  },
  RateUnit: 'CHF',
  AmountFreeCumulative: false
}

const GoogleDriveEdu = {
  Style: 'CategoryCost',
  Provider: 'Google',
  Name: 'Google Workspace',
  ByYear: true,
  Adaptive: false,
  ExtraInfo: 'Google Storage is not recommended as the data are stored outside of Switzerland',
  ExtraInfoUrl: 'https://support.epfl.ch/epfl?id=epfl_service_status&service=b1c22728db34c700ef64731b8c9619ad',
  Url: [{
    Name: 'Google Education Page',
    Url: 'https://edu.google.com/intl/en_ALL/'
  }],
  AmountName: 'Amount',
  AmountUnit: 'GB',
  AmountMin: 0,
  AmountMax: 20,
  AmountStep: 1,
  AmountFree: 0,
  CatName: 'Options',
  Cat: {
    'Individual 20GB': 0,
    'Group 50GB': 0
  },
  CatUnit: 'CHF'
}

const DropboxPerso = {
  Style: 'CategoryCost',
  Provider: 'Dropbox',
  Name: 'Dropbox Personal',
  ByYear: true,
  ExtraInfo: 'Dropbox must not be used for confidential data as the data are stored outside of Switzerland',
  ExtraInfoUrl: 'https://support.epfl.ch/kb_view_customer.do?sysparm_article=KB0012882',
  Url: [
    { Name: 'Dropbox', Url: 'https://www.dropbox.com/plans?trigger=nr' }
  ],
  CatName: 'Plan',
  Cat: {
    'Personal Free 2Go': 0,
    'Personal Plus 2TB': 107,
    'Essentials (3TB)': 193
  },
  CatUnit: 'CHF'
}

const DropboxTeam = {
  Style: 'AmountRatesCost',
  Provider: 'Dropbox',
  Name: 'Dropbox for Team',
  ByYear: true,
  ExtraInfo: 'Dropbox must not be used for confidential data as the data are stored outside of Switzerland',
  ExtraInfoUrl: 'https://support.epfl.ch/kb_view_customer.do?sysparm_article=KB0012882',
  Url: [{
    Name: 'Dropbox',
    Url: 'https://www.dropbox.com/plans?trigger=nr'
  }],
  Adaptive: false,
  AmountName: 'Number of Users',
  AmountUnit: 'Users',
  AmountMin: 1,
  AmountMax: 500,
  AmountStep: 1,
  AmountFree: 0,
  AmountFreeCumulative: false,
  RateName: 'Plan',
  Rates: {
    'Business (9TB)': 172,
    'Business Plus (15TB)': 214
  },
  RateUnit: 'CHF / User'
}

// ELN
const SLIMSEpfl = {
  Style: 'CategoryAmountRatesCost',
  Provider: 'EPFL-SV-IT',
  Name: 'SLIMS',
  ByYear: true,
  Url: [
    { Name: 'SLIMS on SV-IT Website', Url: 'https://www.epfl.ch/schools/sv/it/374-2/applications/eln-lims/' },
    { Name: 'Genohm (SLIMS Company)', Url: 'https://www.genohm.com/' }
  ],
  CatName: 'PI Status',
  Cat: {
    'Full Professor': 3000,
    'Associate Professor': 2000,
    'Tenure Track Assistant Professor or Core Facility': 1000
  },
  CatUnit: 'CHF',
  Adaptive: false,
  AmountName: 'Storage',
  AmountUnit: 'TB',
  AmountMin: 1,
  AmountMax: 100,
  AmountStep: 1,
  AmountFree: 0,
  AmountFreeCumulative: false,
  RateName: 'ELN Storage',
  Rates: {
    'Stored on EPFL Server': 45
  },
  RateUnit: 'CHF / TB'
}

const ELNEpfl = {
  Style: 'CategoryCost',
  Provider: 'ELN-EPFL',
  Name: 'ELN',
  ByYear: true,
  Url: [
    { Name: 'ELN Website', Url: 'https://eln.epfl.ch/' }
  ],
  CatName: 'Options',
  Cat: {
    'Free for EPFL community': 0
  },
  CatUnit: 'CHF'
}

const Rspace = {
  Style: 'CategoryCost',
  Provider: 'Rspace community',
  Name: 'Rspace',
  ByYear: true,
  Url: [
    { Name: 'Rspace Website', Url: 'https://www.researchspace.com/' }
  ],
  CatName: 'Options',
  Cat: {
    'Cloud Based unlimited storage and user': 0
  },
  CatUnit: 'CHF'
}

const Benchling = {
  Style: 'CategoryCost',
  Provider: 'Benchling',
  Name: 'ELN',
  ByYear: true,
  ExtraInfo: 'The first 10GB are free',
  ExtraInfoUrl: '',
  Url: [
    { Name: 'Benchling website', Url: 'https://benchling.com/academic' }
  ],
  CatName: 'Options',
  Cat: {
    'Cloud Based 10GB': 0
  },
  CatUnit: 'CHF'
}

// Database
const MysqlEpfl = {
  Style: 'CategoryCost',
  Provider: 'EPFL-VPO-DSI',
  Name: 'MySql',
  ByYear: true,
  Adaptive: false,
  Url: [
    { Name: 'EPFL DSI ', Url: 'https://support.epfl.ch/epfl?id=epfl_service_status&service=eb026fa0db34c700ef64731b8c96198e' }
  ],
  CatName: 'Options',
  Cat: {
    'MySQL max 2GB': 0
  },
  CatUnit: 'CHF'
}

// Repository
const Zenodo = {
  Style: 'CategoryCost',
  Provider: 'Zenodo-CERN',
  Name: 'Zenodo',
  ByYear: false,
  Adaptive: false,
  Url: [
    { Name: 'Zenodo Website', Url: 'https://www.zenodo.org/' },
    { Name: 'About Zenodo', Url: 'http://about.zenodo.org/' }
  ],
  CatName: 'Options',
  Cat: {
    'Max 50GB per Dataset': 0
  },
  CatUnit: 'CHF'
}

const GitlabEPFL = {
  Style: 'CategoryCost',
  Provider: 'EPFL-VPO-DSI',
  Name: 'Gitlab EPFL',
  Url: [
    { Name: 'Gitlab EPFL', Url: 'https://gitlab.epfl.ch/' }
  ],
  ByYear: true,
  Adaptive: false,
  ExtraInfo: 'A Gitlab server is operated by DSI staff at EPFL',
  CatName: 'Options',
  Cat: {
    'Free for text file': 0
  },
  CatUnit: 'CHF'
}

const Github = {
  Style: 'AmountRatesCost',
  Provider: 'Microsoft',
  Name: 'GitHub',
  Url: [
    { Name: 'Github Website Pricing', Url: 'https://github.com/pricing' }
  ],
  AmountName: 'Number of user',
  AmountUnit: 'User(s)',
  Adaptive: true,
  ByYear: true,
  AmountMin: [1, 5, 10],
  AmountMax: [100, 100, 100],
  AmountStep: [1, 1, 1],
  AmountFree: [0, 0, 0],
  AmountFreeCumulative: false,
  RateName: 'Plan',
  Rates: {
    Free: 0,
    Team: 43,
    Enterprise: 225
  },
  RateUnit: 'CHF / Users'
}

const Bitbucket = {
  Style: 'AmountRatesCost',
  Provider: 'Bitbucket',
  Name: 'BitBucket',
  Url: [
    { Name: 'Bitbucket Website Pricing', Url: 'https://bitbucket.org/product/pricing' }
  ],

  AmountName: 'Number of users',
  AmountUnit: 'User(s)',
  Adaptive: true,
  ByYear: true,
  AmountMin: [1, 5, 5],
  AmountMax: [5, 100, 100],
  AmountStep: [1, 1, 1],
  AmountFree: [0, 0, 0],
  AmountFreeCumulative: false,
  RateName: 'Plan',
  Rates: {
    'Free (up to 5 users)': 0,
    'Standard for growing teams (min 5 users)': 32,
    'Premium for large teams (min 5 users)': 64
  },
  RateUnit: 'CHF / Users'
}

const Gitlab = {
  Style: 'AmountRatesCost',
  Provider: 'Gitlab',
  Name: 'Gitlab',
  Url: [
    { Name: 'Gitlab Website Pricing', Url: 'https://about.gitlab.com/pricing/' }
  ],
  AmountName: 'Number of users',
  AmountUnit: 'User(s)',
  AmountMin: 1,
  AmountMax: 100,
  AmountStep: 1,
  AmountFree: 0,
  Adaptive: false,
  AmountFreeCumulative: false,
  ByYear: true,
  RateName: 'Plan',
  Rates: {
    'Free (1 user, 5GB)': 0,
    'Premium (team, 50 GB)': 310,
    'Ultimate (team, 250 GB)': 1060
  },
  RateUnit: 'CHF / user'
}

const Figshare = {
  Style: 'AmountRatesCost',
  Provider: 'Figshare',
  Name: 'Figshare',
  Url: [
    { Name: 'Figshare website', Url: 'https://figshare.com/' },
    { Name: 'Figshare Pricing', Url: 'https://www.g2.com/products/figshare/pricing' },
    { Name: 'Figshare+ Pricing', Url: 'https://knowledge.figshare.com/plus#pricing' }
  ],
  AmountName: 'Volume',
  AmountUnit: 'GB',
  Adaptive: true,
  ByYear: true,
  AmountMin: [1, 100, 250],
  AmountMax: [20, 100, 5000],
  AmountStep: [1, 79, 250],
  AmountFree: [0, 0, 0],
  AmountFreeCumulative: false,
  RateName: 'Plan',
  Rates: {
    'Free (up to 20 GB)': 0,
    '21-100 GB (flat rate)': 4.0,
    'Over 100 GB': 3.1
  },
  RateUnit: 'CHF / GB'
}

const Dryad = {
  Style: 'CategoryAmountRatesCost',
  Provider: 'Dryad',
  Name: 'Dryad',
  Url: [
    { Name: 'Dryad Website Pricing', Url: 'https://datadryad.org/stash/requirements#cost' }
  ],
  ByYear: false,
  ExtraInfo: 'The costs of enabling access to research data under an SNSF grant are eligible. The  data archives (data repositories) have to meet the FAIR principles.',
  ExtraInfoUrl: 'http://www.snf.ch/SiteCollectionDocuments/snsf-general-implementation-regulations-for-the-funding-regulations-e.pdf#page=15',
  CatName: 'Options',
  Cat: {
    'up to 50GB if DPC covered': 0,
    'up to 50GB if no  DPC covered': 134
  },
  CatUnit: 'CHF',
  AmountName: 'Storage',
  AmountUnit: 'GB',
  Adaptive: false,
  AmountMin: 50,
  AmountMax: 300,
  AmountStep: 10,
  AmountFree: 50,
  AmountFreeCumulative: false,
  RateName: 'Storage',
  Rates: {
    'Extra Storage': 4.5
  },
  RateUnit: 'CHF / GB'
}

const Acoua = {
  Style: 'CategoryCost',
  Provider: 'EPFL',
  Name: 'ACOUA (Academic Output Archive)',
  ByYear: false,
  Adaptive: false,
  Url: [
    { Name: 'About ACOUA', Url: 'https://go.epfl.ch/acoua' },
  ],
  ExtraInfo: 'The ACOUA service is exclusively designed for EPFL researchers.',
  CatName: 'Options',
  Cat: {
    'Costs covered by EPFL-DSI': 0
  },
  CatUnit: 'CHF'
}

const EpflS3 = {
  Style: 'AmountRatesCost',
  Provider: 'EPFL-DSI',
  Name: 'EPFL S3',
  Url: [
    { Name: 'Service description', Url: 'https://support.epfl.ch/epfl?id=epfl_kb_article_view&sys_kb_id=e8d10bf997fc7150e55e370f2153af5a' }
  ],
  AmountName: 'Volume',
  AmountUnit: 'TB',
  AmountMin: 1,
  AmountMax: 100,
  AmountStep: 1,
  AmountFree: 0,
  Adaptive: false,
  AmountFreeCumulative: false,
  ByYear: true,
  RateName: 'Plan',
  Rates: {
    'Project funded by EPFL budgetary allocation': 29,
    'Project funded by H2020 or SNSF': 83.90
  },
  RateUnit: 'CHF / TB'
}

const ScitasArchive = {
  Style: 'AmountRatesCost',
  Provider: 'EPFL-VPA-SCITAS',
  Name: 'SCITAS Archive LTO',
  Url: [
    { Name: 'User documentation', Url: 'https://scitas-doc.epfl.ch/user-guide/data-management/archiving/' }
  ],
  AmountName: 'Volume',
  AmountUnit: 'TB',
  AmountMin: 1,
  AmountMax: 100,
  AmountStep: 1,
  AmountFree: 0,
  Adaptive: false,
  AmountFreeCumulative: false,
  ByYear: true,
  ExtraInfo: 'SCITAS rates are provided as estimations only, the actual costs will be based on actual usage at the end of the year',
  RateName: 'Plan',
  Rates: {
    'User fee 1 (for EPFL: direct costs only)': 4.0,
    'User fee 2 (incl. infrastructure maintenance': 13.9,
    'User fee 3 (incl. all direct and indirect costs': 19.1
  },
  RateUnit: 'CHF / TB'
}

// System variable definition
// ----------------------------------------------------
// ----------------------------------------------------
const NoneSelected = {
  Style: 'NoneSelect',
  Provider: 'None',
  Name: '',
  Url: '',
  ByYear: false
}

const UserCostSelect = {
  Style: 'UserCost',
  Provider: 'Manual Provider',
  Name: 'Other',
  Url: '',
  ByYear: false
}

// Categories definition
// ----------------------------------------------------
// ----------------------------------------------------
const storage = {
  Name: 'Active Storage',
  Icon: 'storage.png',
  Url: [
    { Name: 'Research Data storage solutions at EPFL', Url: 'https://go.epfl.ch/rdm-storage' },
    { Name: 'Comparison of file synchronization software', Url: 'https://en.wikipedia.org/wiki/Comparison_of_file_synchronization_software' }
  ],
  Data: [NoneSelected,
    NasEpfl,
    RcpEpfl,
    ScitasEpfl,
    MsPersonalEpfl,
    MsSharedEpfl,
    EpflS3,
    SwitchEpfl,
    GoogleDriveEdu,
    DropboxPerso,
    DropboxTeam,
    UserCostSelect
  ]

}

const ELN = {
  Name: 'Electronic LabBook',
  Icon: 'eln.png',
  Url: [
    { Name: 'EPFL data collection tools (including ELNs)', Url: 'https://www.epfl.ch/campus/library/services-researchers/tools-and-guides/rdm-tools/#collect' }
  ],
  Data: [NoneSelected,
    SLIMSEpfl,
    ELNEpfl,
    Rspace,
    Benchling,
    UserCostSelect
  ]
}

const Database = {
  Name: 'Database',
  Icon: 'database.png',
  Url: '',
  Data: [NoneSelected,
    MysqlEpfl,
    UserCostSelect
  ]
}

const datarepository = {
  Name: 'Data Repository',
  Icon: 'drepos.png',
  Url: [
    { Name: 'EPFL information on data repositories and related platforms', Url: 'https://go.epfl.ch/datarepo' }
  ],
  Data: [
    NoneSelected,
    Zenodo,
    Figshare,
    Dryad,
    UserCostSelect
  ]
}

const coderepository = {
  Name: 'Code Repository',
  Icon: 'crepos.png',
  Url: '',
  Data: [
    NoneSelected,
    GitlabEPFL,
    Github,
    Bitbucket,
    Gitlab,
    UserCostSelect
  ]
}

const longermarchive = {
  Name: 'Long-term Archive',
  Icon: 'archive.png',
  Url: '',
  Data: [
    NoneSelected,
    Acoua,
    EpflS3,
    ScitasArchive,
    UserCostSelect
  ]
}

// Combine Categories
// ----------------------------------------------------
// ----------------------------------------------------

const MainData = {
  InstName: 'EPFL Library',
  InstLogo: 'logo.png',
  InstLogoWidth: 200,
  Updated: '2025-07-10',
  HelpUrl: 'mailto:researchdata@epfl.ch',
  Currency: 'CHF',
  OEXRApi: 'cd8d785bdb6646b0a7e4c0eba5a74199',
  Conv: ['EUR', 'USD', 'GBP'],
  UseStats: true,
  StatsEngine: 'matomo',
  StatsURL: 'costcalc.epfl.ch/matomo/',
  StatsID: '1',
  StatsContact: 'mailto:researchdata@epfl.ch',
  Version: 'v2.4',
  DefaultDuration: 1,
  DefaultArchiveDuration: 10,
  Data: [storage, ELN, Database, datarepository, coderepository, longermarchive]
}
