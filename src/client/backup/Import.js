import React, {Component, PropTypes} from 'react'
import Messages from '../common/messages/Messages'
import Container from '../common/Container'
import Loading from '../common/Loading'
import PrimaryInput from '../common/PrimaryInput'
import './import.scss'

class Import extends Component {
  constructor(props) {
    super(props)
    this.state = {data: ''}
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.infos.length > 0 && nextProps.errors.length === 0) {
      this.setState({data: ''})
    }
  }

  render() {
    const updateData = (event) => this.setState({data: event.target.value})
    const doImport = () => this.props.importData(this.state.data)

    return (
      <Container title='Import' className='import'>
        <Loading loading={this.props.loading}>
          <div>
            <PrimaryInput>
              <textarea className='import-data'
                        placeholder='paste exported configuration here and press import'
                        value={this.state.data}
                        onChange={updateData}
                        spellCheck='false'/>
            </PrimaryInput>
            <button className='import-action' onClick={doImport}>import</button>
            <Messages type='notification' messages={this.props.errors}/>
            <Messages type='checkmark' messages={this.props.infos}/>
          </div>
        </Loading>
      </Container>
    )
  }
}

Import.propTypes = {
  loading: PropTypes.bool,
  errors: PropTypes.arrayOf(React.PropTypes.string),
  infos: PropTypes.arrayOf(React.PropTypes.string),
  importData: PropTypes.func.isRequired
}

export default Import
