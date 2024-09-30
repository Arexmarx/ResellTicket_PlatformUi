
import '../assets/css/LoadingPage.css'

export default function Loader() {
  return (
    <div>
      <div className="loadding-page">
        <div className="cssload-box-loading"></div>
      </div>
      <div className="container">
        <div className="jumbotron">
          <h1>Page loaded</h1>
        </div>
      </div>
    </div>
  )
}
