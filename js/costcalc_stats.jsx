'use strict'

// Declarations for entities defined in other scripts
let React

let MainData

const _paq = window._paq || []

const Stats = {
  Enable: false,
  Engine: '',

  StatsInitMatomo: function (PIWIK_URL, IDSITE) {
    // accurately measure the time spent on the last pageview of a visit
    _paq.push(['enableHeartBeatTimer'])
    _paq.push(['setPagePerformanceTiming', 0])
    _paq.push(['setDocumentTitle', 'MainPage'])
    // require user consent before processing data
    _paq.push(['requireConsent'])
    _paq.push(['trackPageView'])
    _paq.push(['enableLinkTracking'])
    const u = 'https://' + PIWIK_URL + '/'
    _paq.push(['setTrackerUrl', u + 'piwik.php'])
    _paq.push(['setSiteId', IDSITE])
    const d = document
    const g = d.createElement('script')
    const s = d.getElementsByTagName('script')[0]
    g.type = 'text/javascript'
    g.async = true
    g.defer = true
    g.src = u + 'piwik.js'
    s.parentNode.insertBefore(g, s)
  },

  InitStat: function () {
    const engine = MainData.StatsEngine
    const enable = MainData.UseStats
    if (enable) {
      this.Enable = true
      this.Engine = engine
      switch (engine) {
        case 'matomo':
          this.StatsInitMatomo(MainData.StatsURL, MainData.StatsID)
          break
      }
    }
  },

  RecordEvent: function (action, name, value) {
    if (this.Enable) {
      switch (this.Engine) {
        case 'matomo':
          // console.log(['trackEvent', action, name, value])
          _paq.push(['trackEvent', action, name, value])
          break
      }
    }
  },

  ConsentOn: function () {
    console.log('Statistics Enabled')
    if (this.Enable) {
      switch (this.Engine) {
        case 'matomo':
          _paq.push(['rememberConsentGiven'])
          break
      }
    }
  },
  ConsentOff: function () {
    console.log('Statistics Disabled')
    if (this.Enable) {
      switch (this.Engine) {
        case 'matomo':
          _paq.push(['forgetConsentGiven'])
          break
      }
    }
  }
}

class PopupStats extends React.Component {
  constructor (props) {
    super(props)
    // console.log('PopupStats instance constructed')
  }

  render () {
    return (
      <div
        className="modal fade"
        id="PopupStats"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="PopupStatsValidation"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header bg-light">
              <h5 className="modal-title " id="PopupStatsValidationTitle">
                <img src="./icon/stats.png" width="50px" />
                We need you to improve this tool
              </h5>
            </div>
            <div className="modal-body">
              <p>
                {' '}
                In order to improve this tool we have implemented a statistical
                engine that give us information about how you use this cost
                calculator tool.
              </p>
              <p>
                Only <span className="font-weight-bold">Anonymous</span>{' '}
                information are recorded.
              </p>

              <p> If you want to know more :</p>
              {this.knowmore()}
            </div>

            <div className="modal-footer bg-light">
              <p className="font-weight-bold">
                Accepting or Refusing this recording will have not impact on the
                usage of the tools
              </p>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={Stats.ConsentOff.bind(Stats)}
              >
                I Refuse
              </button>
              <button
                type="button"
                className="btn btn-success"
                data-dismiss="modal"
                onClick={Stats.ConsentOn.bind(Stats)}
              >
                I Accept
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  knowmore () {
    return (
      <div className="accordion" id="Statskm">
        <div className="card">
          <div className="card-header" id="headingOne">
            <h2 className="mb-0">
              <button
                className="btn btn-link collapsed"
                type="button"
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-expanded="false"
                aria-controls="collapseOne"
              >
                Which kind of data are you recording ?
              </button>
            </h2>
          </div>

          <div
            id="collapseOne"
            className="collapse"
            aria-labelledby="headingOne"
            data-parent="#Statskm"
          >
            <div className="card-body">
              We are recording the generic usage of the tools such as :
              <ul>
                <li>Number of visits</li>
                <li>Time spend within the tool</li>
                <li>Categories used</li>
                <li>What kind of tools is used (Example : export)</li>
              </ul>
              What we are <span className="font-weight-bold"> never</span>{' '}
              recording :
              <ul>
                <li>Your IP address</li>
                <li>The costs and options you enter</li>
                <li>Manual inputs</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header" id="headingTwo">
            <h2 className="mb-0">
              <button
                className="btn btn-link collapsed"
                type="button"
                data-toggle="collapse"
                data-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                Who collects the data ?
              </button>
            </h2>
          </div>
          <div
            id="collapseTwo"
            className="collapse"
            aria-labelledby="headingTwo"
            data-parent="#Statskm"
          >
            <div className="card-body">{this.KmTools()}</div>
          </div>
        </div>
        <div className="card">
          <div className="card-header" id="headingThree">
            <h2 className="mb-0">
              <button
                className="btn btn-link collapsed"
                type="button"
                data-toggle="collapse"
                data-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                Why are you collecting statistics ?
              </button>
            </h2>
          </div>
          <div
            id="collapseThree"
            className="collapse"
            aria-labelledby="headingThree"
            data-parent="#Statskm"
          >
            <div className="card-body">
              We are developing this tool and would like to know how you use it,
              in particular which options and categories you are using most in
              order to improve and update the tools for your needs.
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header" id="headingFour">
            <h2 className="mb-0">
              <button
                className="btn btn-link collapsed"
                type="button"
                data-toggle="collapse"
                data-target="#collapseFour"
                aria-expanded="false"
                aria-controls="collapseFour"
              >
                Who should I contact for my information ?
              </button>
            </h2>
          </div>
          <div
            id="collapseFour"
            className="collapse"
            aria-labelledby="headingFour"
            data-parent="#Statskm"
          >
            <div className="card-body">
              You can contact us <a href={MainData.StatsContact}>Here</a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  KmTools () {
    switch (Stats.Engine) {
      case 'matomo':
        return (
          <div>
            <p>
              We are using a self-hosted version of{' '}
              <a href="https://matomo.org/">Matomo</a>
            </p>
            <p>
              The data are only stored on our servers at {MainData.StatsURL}
            </p>
            <p className="font-weight-bold">
              The data are only for research purpose and will not be shared my
              any 3rd party.
            </p>
          </div>
        )
    }
  }
}

PopupStats.propTypes = {}

Stats.InitStat()
