'use strict'

// Declarations for entities defined in other scripts
let React
let PropTypes

let ButtonInput
let Stats
let ConvCurrency

let projectduration

// This code manages the export part of the engine
class ManageExport extends React.Component {
  constructor (props) {
    super(props)
    this.make_export = this.make_export.bind(this)
    this.make_copy = this.make_copy.bind(this)
    this.rmvempty = this.rmvempty.bind(this)
    this.hide = this.hide.bind(this)
    this.colsdef = ['Category', 'Provider', 'Name', 'Comments', 'Options', 'Cost']
    this.colconv = 'Cost'
    this.state = {
      output: '',
      disp: false,
      rmvempty: false,
      typexp: '',
      ConvEnable: this.props.conv.Enable
    }
    this.cols = this.colsdef.slice(0)
    this.colsconv = this.cols.slice(0)
    this.colsconv.push(this.colconv)
  }

  render () {
    if (this.props.conv.Enable) {
      this.cols = this.colsconv
    } else {
      this.cols = this.colsdef
    }
    let opt = ''
    let output = ''
    if (this.state.disp) {
      opt = this.options_btn()
      output = this.make_output(this.props.data.data)
    }

    return (
            <div id="export-group">
              <div className="card">
                <div className="card-header">
                  {this.export_btn()}
                </div>
                <div className="card-body">
                  <div id="export-output" >
                    {output}

                  </div>
                </div>
                <div className="card-footer">
                  {opt}
                </div>
              </div>
            </div>
    )
  }

  export_btn () {
    return (
            <div className="row" id="export-btn">
              <div className="col-auto">
                <ButtonInput class="btn-primary" onClick={this.make_export} id="btn-export" name={<span>Export HTML</span>} tips="Export in HTML, can also be used into Word"
                             n="html"/>
              </div>
              <div className="col-auto">
                <ButtonInput class="btn-secondary" onClick={this.make_export} id="btn-export" name={<span>Export HTML Source</span>} tips="Export in HTML source code"
                             n="htmlsrc"/>
              </div>
              <div className="col-auto">
                <ButtonInput class="btn-success" onClick={this.make_export} id="btn-export" name={<span>Export Markdown</span>} tips="Export in Markdown source code"
                             n="mark"/>
              </div>
              <div className="col-auto">
                <ButtonInput class="btn-warning" onClick={this.make_export} id="btn-warning" name={<span>Export CSV</span>} tips="Export in CSV source code"
                             n="csv"/>
              </div>
            </div>
    )
  }

  options_btn () {
    let Namermv
    if (this.state.rmvempty) {
      Namermv = <span>Display Empty Lines</span>
    } else {
      Namermv = <span>Remove Empty Lines</span>
    }
    return (
            <div className="row">
              <div className="col-auto">
                  <ButtonInput class="btn-secondary" onClick={this.make_copy} id="btn-export" name={<span>Copy to Clipboard</span>} tips="Copy the output into your clipboard"
                               n="mark"/>
              </div>
              <div className="col-auto">
                <ButtonInput class="btn-primary" onClick={this.rmvempty} id="btn-export" name={Namermv} tips="Remove line(s) that don't have a provider"
                             n="mark"/>
              </div>
              <div className="col-auto">
                <ButtonInput class="btn-dark" onClick={this.hide} id="btn-export" name={<span>Hide Export</span>} tips="Hide export"
                             n="mark"/>
              </div>
            </div>
    )
  }

  rmvempty () {
    let revertRmvempty = !this.state.rmvempty
    this.setState({ rmvempty:  revertRmvempty })
    // this.make_export(this.typexp)
  }

  hide () {
    this.setState({ disp: false })
  }

  make_copy () {
  const el = document.getElementById('export-output')
  navigator.clipboard.writeText(el.innerText).then(() => {
    alert('Copied')
    Stats.RecordEvent('Export', 'clipboard', 0)
  })
}

  make_output (rdata) {
    const data = this.read_export(rdata)
    const hcol = this.cols
    // Generate a stat export
    Stats.RecordEvent('Export', this.state.typexp, 0)

    switch (this.state.typexp) {
      case 'html':
        return this.htmlout(hcol, data)
      case 'htmlsrc':
        return this.htmlsrcout(hcol, data)
      case 'mark':
        return this.markout(hcol, data)
      case 'csv':
        return this.csvout(hcol, data)
    }
  }

  make_export (typ) {
    this.setState({ typexp: typ })
    this.setState({ disp: true })
  }

  htmlout (hcol, data) {
    let disps = ''

    if (projectduration > 1) disps = 's'
    let movecol = 3
    let Convcol = null
    if (this.props.conv.Enable) {
      movecol = 4
      Convcol = <td align="center"><strong>{ConvCurrency(this.props.data.total)}</strong></td>
    }
    return (
            <div id="htmlexport" className="container">
              <table className="table table-striped table-bordered" width="100%">
                <thead className="thead-dark">
                  <tr>
                    {this.makecol(hcol, 'html', true)}
                  </tr>
                </thead>
                <tbody>
                  {this.htmltable(data)}
                  <tr className="table-info">
                    <td>{this.props.projectName}</td>
                    <td> {projectduration} year{disps}</td>
                    <td colSpan={hcol.length - movecol} align="right"><strong>Total Cost</strong></td>
                    <td align="center"><strong>{this.props.data.total}</strong></td>
                    {Convcol}
                  </tr>
                </tbody>
              </table>
            </div>
    )
  }

  htmlsrcout (hcol, data) {
    let disps = ''
    if (projectduration > 1) disps = 's'
    let movecol = 3
    let Convcol = null
    if (this.props.conv.Enable) {
      movecol = 4
      Convcol = <span>&lt;td align=&quot;center&quot;&gt; &lt;strong&gt;{ConvCurrency(this.props.data.total)}&lt;/strong&gt;&lt;/td&gt;</span>
    }
    return (
            <div id="htmlexport">
              <pre><code>
                &lt;table&gt;<br/>
                &lt;thead&gt;<br/>
                {this.makecol(hcol, 'htmlsrc', true)}
                &lt;/thead&gt;<br/>
                &lt;tbody&gt;<br/>
                {this.htmlsrctable(data)}
                &lt;tr &gt;<br/>
                &lt;td&gt;{this.props.projectName}&lt;/td&gt;
                &lt;td&gt;{projectduration} year{disps}&lt;/td&gt;
                &lt;td colSpan={hcol.length - movecol} align=&quot;right&quot;&gt;&lt;strong&gt;Total Cost&lt;/strong&gt;&lt;/td&gt;&lt;td align=&quot;center&quot;&gt;&lt;strong&gt;
                {this.props.data.total}&lt;/strong&gt;&lt;/td&gt;
                {Convcol}
                <br/>
                &lt;/tr&gt;<br/>
                &lt;/tbody&gt;<br/>
                &lt;/table&gt;<br/>
              </code></pre>
            </div>
    )
  }

  markout (hcol, data) {
    let disps = ''
    if (projectduration > 1) disps = 's'
    const Head = Array.from({ length: this.cols.length }, () => '---')
    let movecol = 3
    let Convcol = null
    if (this.props.conv.Enable) {
      movecol = 4
      Convcol = <span>{ConvCurrency(this.props.data.total)}|</span>
    }
    const col = Array.from({ length: hcol.length - movecol }, () => '| ')

    return (
            <div id="htmlexport">
              <pre><code>
                |{this.makecol(hcol, 'mark', true)}<br/>
                |{this.makecol(Head, 'mark')}<br/>

                {this.marktable(data)}

                |{this.props.projectName}|{projectduration} year{disps}{col} Total Cost |{this.props.data.total}|{Convcol}<br/>

               </code></pre>
            </div>
    )
  }

  csvout (hcol, data) {
    let disps = ''
    if (projectduration > 1) disps = 's'
    let movecol = 3
    let Convcol = null
    if (this.props.conv.Enable) {
      movecol = 4
      Convcol = <span>{ConvCurrency(this.props.data.total)},</span>
    }
    const col = Array.from({ length: hcol.length - movecol }, () => ',')

    return (
            <div id="htmlexport">
              <pre><code>
                {this.makecol(hcol, 'csv', true)}<br/>

                {this.csvtable(data)}

                {this.props.projectName},{projectduration} year{disps}{col} Total Cost ,{this.props.data.total},{Convcol}<br/>

              </code></pre>
            </div>
    )
  }

  makecol (cols, style, head) {
    const children = []
    switch (style) {
      case 'html':
        for (let j = 0; j < cols.length; j++) {
          if (head) {
            children.push(<th key={j}>{cols[j]}</th>)
          } else {
            children.push(<td key={j}>{cols[j]}</td>)
          }
        }
        return children
      case 'htmlsrc':
        for (let j = 0; j < cols.length; j++) {
          if (head) {
            children.push(<span key={j}>&lt;th&gt; {cols[j]} &lt;/th&gt;</span>)
          } else {
            children.push(<span key={j}>&lt;td&gt; {cols[j]} &lt;/td&gt;</span>)
          }
        }
        return children
      case 'mark':
        for (let j = 0; j < cols.length; j++) {
          children.push(<span key={j}> {cols[j]}|</span>)
        }
        return children
      case 'csv':
        for (let j = 0; j < cols.length; j++) {
          children.push(<span key={j}> {cols[j]},</span>)
        }
        return children
    }
  }

  htmltable (data) {
    const items = []
    for (let i = 0; i < data.length; i++) {
      const row = Object.values(data[i])

      const children = this.makecol(row, 'html')
      items.push(<tr key={i}>{children}</tr>)
    }
    return items
  }

  htmlsrctable (data) {
    const items = []
    for (let i = 0; i < data.length; i++) {
      const row = Object.values(data[i])
      const children = this.makecol(row, 'htmlsrc')
      items.push(<span key={i}>&lt;tr&gt; {children} &lt;/tr&gt;<br key={i}/></span>)
    }
    return items
  }

  marktable (data) {
    const items = []
    for (let i = 0; i < data.length; i++) {
      const row = Object.values(data[i])
      const children = this.makecol(row, 'mark')
      items.push(<span key={i}>|{children}<br key={i}/></span>)
    }
    return items
  }

  csvtable (data) {
    const items = []
    for (let i = 0; i < data.length; i++) {
      const row = Object.values(data[i])
      const children = this.makecol(row, 'csv')
      items.push(<span key={i}>{children}<br key={i}/></span>)
    }
    return items
  }

  read_export (rawexport) {
    const output = []
    for (let cat = 0; cat < rawexport.length; cat++) {
      const state = rawexport[cat]
      for (let mod = 0; mod < state.length; mod++) {
        if ((!this.state.rmvempty) || (state[mod].Provider !== '')) {
          let tmp = {
            Category: state[mod].Category,
            Provider: state[mod].Provider,
            Name: state[mod].Name,
            Comments: state[mod].Comments,
            Options: this.read_options(state[mod].ExportCmp),
            Cost: state[mod].Cost
          }
          if (this.props.conv.Enable) tmp.Cost2 = ConvCurrency(state[mod].Cost)

          output.push(tmp)
        }
      }
    }
    return output
  }

  read_options (Options) {
    const output = []
    for (let i = 0; i < Options.length; i++) {
      switch (this.state.typexp) {
        case 'html':
          output.push(<span key={i}><b>{Options[i].Name}</b> : <i>{Options[i].Value}</i> </span>)
          break
        case 'htmlsrc':
          output.push(<span key={i}>&lt;b&gt;{Options[i].Name}&lt;/b&gt; : &lt;i&gt;{Options[i].Value}&lt;/i&gt; </span>)
          break
        case 'mark':
          output.push(<span key={i}>__{Options[i].Name}__ : *{Options[i].Value}*  </span>)
          break
        case 'csv':
          output.push(<span key={i}>{Options[i].Name} : {Options[i].Value}  </span>)
          break
      }
      if (i < Options.length - 1) {
        output.push(<br key={i + 1000}/>)
      }
    }
    return output
  }

  /*
  fnSelect (objId) {
    this.fnDeSelect()
    let range
    if (document.selection) {
      range = document.body.createTextRange()
      range.moveToElementText(document.getElementById(objId))
      range.select()
    } else if (window.getSelection) {
      range = document.createRange()
      range.selectNode(document.getElementById(objId))
      window.getSelection().addRange(range)
    }
  }

  fnDeSelect () {
    if (document.selection) {
      document.selection.empty()
    } else if (window.getSelection) {
      window.getSelection().removeAllRanges()
    }
  }
  */
}

ManageExport.propTypes = {
  conv: PropTypes.object,
  data: PropTypes.object
}
