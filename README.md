Cost Calculator
============
(https://costcalc.epfl.ch)

## Introduction

The cost calculator is an online project for calculating the cost of services. It's originally designed for helping researcher for estimating the cost of managing data. The user can calculate the cost of the data life cycle directly from the interface.

Categories, Providers, Cost can be easily updated by just changing the **data.js** so it can be adapted for your own institution.


## How to use it

The structure is highly modular and can be extended for different projects. 
All the information are stored on javascript and the system only uses javascript 
libraries making really easy to install and update.

You don't need a specific webserver (but you can use one), just use your github repo 
and create a pages link your cost calculator will be accessible

For local use, you need a mini web server such as https://www.npmjs.com/package/http-server

## Documentation

The documentation of the project explains how to install it and configure it. See [Docs](./Docs)

## Files/Folders

* All the engine is stored in the **js** folder
* index.html : main index for production
* **docs** contains the documentation for changing the database of provider or the engine itself.
* __index-dev.html__ : Index file for development only


## Citation
The project is hosted on Zenodo : [![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.1469034.svg)](https://doi.org/10.5281/zenodo.1469034)

The citation information are in the __CITATION__ file and __CODEMETA.json__.

## Development information

`js/costcalc_main.jsx` is the main entry point. It also defines and uses most React components that call each other.

```
Main
├── page_head()
│   ├── ButtonHrefInput?         (Help / Feedback buttons)
│   └── Static content
│
├── project_info()
│   ├── TxtInput                 (Project name)
│   ├── AmountInput              (Project duration)
│   ├── CurrencySelect?          (external component, if rates loaded)
│   └── PluginsMain
│       ├── Repeat (for each category in MainData.Data)
│       │   └── ManagePlugins
│       │       ├── Repeat (for each duplicated line in category)
│       │       │   └── ProviderPluginsSelector
│       │       │       ├── ModuleHeader
│       │       │       │   ├── ButtonInput?       (+ add line)
│       │       │       │   ├── ButtonInputWpop?   (- remove line)
│       │       │       │   └── CostOutput
│       │       │       │
│       │       │       ├── SelectorInput          (provider selector)
│       │       │       ├── Dynamic plugin (STYLE_COMPONENTS)
│       │       │       │   ├── AmountRatesCost
│       │       │       │   │   ├── AmountInput
│       │       │       │   │   ├── SelectorInput
│       │       │       │   │   └── CostOutput
│       │       │       │   │
│       │       │       │   ├── CategoryAmountRatesCost
│       │       │       │   │   ├── SelectorInput   (category)
│       │       │       │   │   ├── AmountInput
│       │       │       │   │   ├── SelectorInput   (rate)
│       │       │       │   │   └── CostOutput
│       │       │       │   │
│       │       │       │   ├── CategoryCost
│       │       │       │   │   ├── SelectorInput
│       │       │       │   │   └── CostOutput
│       │       │       │   │
│       │       │       │   ├── UserCost
│       │       │       │   │   ├── TxtInput        (provider)
│       │       │       │   │   ├── TxtInput        (service)
│       │       │       │   │   ├── CheckboxInput   (by year)
│       │       │       │   │   └── CostOutput
│       │       │       │   │
│       │       │       │   └── NoneSelect
│       │       │       │       └── Textoutput
│       │       │       │
│       │       │       ├── TxtInput                (comments)
│       │       │       └── MakeknowmoreInput?
│
├── final_cost()
│   ├── CostOutput               (Total)
│   └── ConvCurrency?            (external component)
│
├── howto()
│   ├── ButtonInput              (demo add/remove buttons)
│   └── Static instructional content
│
└── page_foot()
    └── Static footer content
```

## License and Term of Usage

This project is release under the GNU GPLv3 license, see __LICENSE__.

It's a work of the Research Data Management Team at EPFL Library in Switzerland.
