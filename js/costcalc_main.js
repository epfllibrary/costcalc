'use strict';


function tonumeric (value) {
    return parseFloat(
        value.toString().replace(/[^0-9\.]+/g, '')
    );
}

function tomoney(numeric) {
    if (typeof numeric == 'string') {
        numeric = parseFloat(numeric);
    }

    return numeric.toFixed(0).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' CHF';
}

function sum(obj) {
    const val=Object.values(obj);
    var total = 0;
    for (var i = 0; i < val.length; i++) {
        total = total + tonumeric(val[i]);
    }
    return total;
}


class AmountInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onAmountChange(e.target.value);
    }

    render() {
        const value = this.props.value;
        return (
            <div className="col">
                <label htmlFor={this.props.id}> {this.props.name} </label>
                <input type="range" className="form-control-range" id={this.props.id} min={this.props.min} max={this.props.max}
                       step={this.props.step} value={value}  onChange={this.handleChange} />
                <small id="nas-amount-cost" className="form-text text-muted">Amount : {value} {this.props.unit} </small>
            </div>
        );
    }
}

class RatesInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.listoptions = props.options.map((opt) =>
            <option key={opt.toString()}>{opt}</option>);

    }

    handleChange(e) {
        this.props.onRateChange(e.target.value);
    }

    render() {
        const value = this.props.value;
        return (
            <div className="col">
                <label htmlFor={this.props.id}> {this.props.name} </label>
                <select id={this.props.id} className="form-control" value={value}  onChange={this.handleChange}>
                    {this.listoptions}
                </select>
               <small id="nas-amount-cost" className="form-text text-muted">Rate : {this.props.rate}  {this.props.unit} </small>
            </div>
        );
    }
}

class SelectorInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.listoptions = props.options.map((opt) =>
            <option key={opt.toString()}>{opt}</option>);

    }

    handleChange(e) {
        this.props.onChange(e.target.value);
    }

    render() {
        const value = this.props.value;
        return (
            <div className="col">
                <label htmlFor={this.props.id}> {this.props.name} </label>
                <select id={this.props.id} className="form-control" value={value}  onChange={this.handleChange}>
                    {this.listoptions}
                </select>
                <small id="nas-amount-cost" className="form-text text-muted">{this.props.legend}</small>
            </div>
        );
    }
}

class CostOutput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        this.props.onCostChange(this.props.display);
    }

    render() {
        return (
            <div className="col">
                <label htmlFor="{this.props.id}">{this.props.name}</label>
                <input type="text" className="form-control" id="{this.props.id}" className="form-control"
                       value={this.props.value} onChange={this.handleChange}/>
            </div>
        );
    }
}

function Textoutput(props){
    return(
        <div className="alert alert-primary" role="alert">
            {props.text}
        </div>
    );
}

class AmountRatesCost extends React.Component {
    constructor(props) {
        super(props);
        this.state={amount : 1, SelectRate : 0 , Rate : this.props.data.Rates[Object.keys(this.props.data.Rates)[0]]};
        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.handleRateChange = this.handleRateChange.bind(this);
    }
    handleAmountChange(amount) {
        this.setState({amount: amount});
    }
    handleRateChange(select) {
        this.setState({SelectRate: select});
        this.setState({Rate: this.props.data.Rates[select]});
    }

    render() {
        const Amount = this.state.amount;
        const Rate=this.state.Rate;
        const Cost=this.makecost(Amount,Rate);

        return (
            <div className="row">
                <p className="h1">{this.props.name}</p>
                <AmountInput id={this.props.name} min={this.props.data.AmountMin} max={this.props.data.AmountMax}
                             step={this.props.data.AmountStep} value={Amount} name={this.props.data.AmountName}
                             unit={this.props.data.AmountUnit} onAmountChange={this.handleAmountChange} />

                <RatesInput id={this.props.name+'-Rates'} name={this.props.data.RateName} options={Object.keys(this.props.data.Rates)}
                            rate={Rate} unit={this.props.data.RateUnit} onRateChange={this.handleRateChange} />

                <CostOutput id={this.props.name+'-Cost'} name={"Cost"} value={Cost} />
            </div>
        );
    }
    makecost(amount,rate) {
        var total=(amount-this.props.data.AmountFree)*rate;
        total=tomoney(total);
        this.props.onCostChange(this.props.name,total);
        return total;
    }
    }

class CategoryAmountRatesCost extends React.Component {
    constructor(props) {
        super(props);
        this.state={SelectCat : 0,  Cat : this.props.data.Cat[Object.keys(this.props.data.Cat)[0]],
            amount : 1, SelectRate : 0 , Rate : this.props.data.Rates[Object.keys(this.props.data.Rates)[0]]};
        this.handleCatChange = this.handleCatChange.bind(this);
        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.handleRateChange = this.handleRateChange.bind(this);
        // this.handleCostChange = this.handleCostChange.bind(this);

    }
    handleAmountChange(amount) {
        this.setState({amount: amount});
    }
    handleRateChange(select) {
        this.setState({SelectRate: select});
        this.setState({Rate: this.props.data.Rates[select]});
    }

    handleCatChange(select) {
        this.setState({SelectCat: select});
        this.setState({Cat: this.props.data.Cat[select]});
    }
    // handleCostChange(total) {
    //     this.props.onCostChange(this.props.name,total);
    // }
    render() {
        const Cat=this.state.Cat;
        const Amount = this.state.amount;
        const Rate=this.state.Rate;
        const Cost=this.makecost(Cat,Amount,Rate);

        return (
            <div className="row">
                <p className="h1">{this.props.name}</p>
                <RatesInput id={this.props.name+'-category'} name={this.props.data.CatName} options={Object.keys(this.props.data.Cat)} rate={Cat}
                            unit={this.props.data.CatUnit} onRateChange={this.handleCatChange} />

                <AmountInput id={this.props.name} min={this.props.data.AmountMin} max={this.props.data.AmountMax} step={this.props.data.AmountStep}
                             value={Amount} name={this.props.data.AmountName} unit={this.props.data.AmountUnit} onAmountChange={this.handleAmountChange} />

                <RatesInput id={this.props.name+'-Rates'} name={this.props.data.RateName} options={Object.keys(this.props.data.Rates)} rate={Rate}
                            unit={this.props.data.RateUnit} onRateChange={this.handleRateChange} />

                <CostOutput id={this.props.name+'-Cost'} name={"Cost"} value={Cost} />
            </div>
        );
    }
    makecost(cat,amount,rate) {
        var total=cat+(amount-this.props.data.AmountFree)*rate;
        total=tomoney(total);
        this.props.onCostChange(this.props.name,total);
        return total;
    }
}

class CategoryCost extends React.Component {
    constructor(props) {
        super(props);
        this.state={SelectCat : 0,  Cat : this.props.data.Cat[Object.keys(this.props.data.Cat)[0]]};
        this.handleCatChange = this.handleCatChange.bind(this);

    }


    handleCatChange(select) {
        this.setState({SelectCat: select});
        this.setState({Cat: this.props.data.Cat[select]});
    }
    // handleCostChange(total) {
    //     this.props.onCostChange(this.props.name,total);
    // }
    render() {
        const Cat=this.state.Cat;

        const Cost=this.makecost(Cat);

        return (
            <div className="row">
                <p className="h1">{this.props.name}</p>
                <RatesInput id={this.props.name+'-category'} name={this.props.data.CatName} options={Object.keys(this.props.data.Cat)} rate={Cat}
                            unit={this.props.data.CatUnit} onRateChange={this.handleCatChange} />

                <CostOutput id={this.props.name+'-Cost'} name={"Cost"} value={Cost} />
            </div>
        );
    }
    makecost(cat) {
        var total=cat;
        total=tomoney(total);
        this.props.onCostChange(this.props.name,total);
        return total;
    }
}

class ProviderPluginsSelector extends React.Component {
    constructor(props) {
        super(props);
        this.handleCostChange = this.handleCostChange.bind(this);
        this.handleProviderChange = this.handleProviderChange.bind(this);

        this.state={selected:0,keys:this.ProvidersName(this.props.data)}

    }

    handleCostChange(name,e) {
        this.props.handleCostChange(name,e.target.value);
    }
    handleProviderChange(e){

    }
    render() {
        const Test=this.cmp2string("AmountRatesCost");//window[NasEpfl.style];
        return(
                <div id={"plugin"}>
                    <Test data={NasEpfl} name={"NAS"} onCostChange={this.handleCostChange} />

                    <CategoryCost data={MysqlEpfl} name={"DataBase"} onCostChange={this.handleCostChange}/>

                    <CategoryAmountRatesCost data={SLIMSEpfl} name={"ELN"} onCostChange={this.handleCostChange} />


                </div>
        );
    }
    cmp2string(str){
        switch (str) {
            case "AmountRatesCost" : return AmountRatesCost;
            case "CategoryCost" : return CategoryCost;
            case "CategoryAmountRatesCost" : return CategoryAmountRatesCost

        }
    }
    ProvidersName(main){
        var data=main.data;
        console.log(data)

        var providers=[];
        for (var i = 0; i < data.length; i++) {
            providers.push(data[i].provider)
        }
        return providers;
    }

}


class PluginsMain extends React.Component {
    constructor(props) {
        super(props);
        this.handleCostChange = this.handleCostChange.bind(this);
        this.state={'varsum':{}};
        console.log(this.ProvidersName(storage))
    }

    handleCostChange(name,e) {
  //      this.props.costs{name:e};
        this.state.varsum[name]=e;
        this.props.TotalCost(sum(this.state.varsum));

    }
    render() {
        const Test=this.cmp2string("AmountRatesCost");//window[NasEpfl.style];
        return(
            <div className="container">
            <div id={"pluginsmain"}>
                <Test data={NasEpfl} name={"NAS"} onCostChange={this.handleCostChange} />

                <CategoryCost data={MysqlEpfl} name={"DataBase"} onCostChange={this.handleCostChange}/>

                <CategoryAmountRatesCost data={SLIMSEpfl} name={"ELN"} onCostChange={this.handleCostChange} />


            </div>
            </div>
        );
    }


}

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.handleCostChange = this.handleCostChange.bind(this);
        this.state={'total':0,'prevtotal':0};
    }

    handleCostChange(total) {
        if (this.state.prevtotal != total){
            // console.log("updated :"+total)
            this.setState({'total':total});
            this.setState({'prevtotal':total});
        }

    }
    render() {
        return(
            <form>
                <PluginsMain TotalCost={this.handleCostChange}/>

                <CostOutput name={"Total Cost per year"} id={"ctotal"} value={tomoney(this.state.total)}/>
            </form>
        );
    }
}


ReactDOM.render(<Main />,document.getElementById('root'));