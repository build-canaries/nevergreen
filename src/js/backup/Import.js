import React, {Component, PropTypes} from 'react'
import ValidationMessages from '../views/general/validationMessages'
import InfoMessages from '../views/general/InfoMessages'
import Container from '../common/Container'
import Loading from '../common/Loading'
import PrimaryInput from '../views/general/PrimaryInput'

class Import extends Component {
  constructor(props) {
    super(props)
    this.state = {data: ''}
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors.length === 0) {
      this.setState({data: ''})
    }
  }

  render() {
    const updateData = (event) => this.setState({data: event.target.value})
    const doImport = () => this.props.importData(this.state.data)

    return (
      <Container title='Import'>
        <Loading loading={this.props.loading}>
          <div>
            <PrimaryInput>
              <textarea className='export-text'
                        placeholder='paste exported configuration here and press import'
                        value={this.state.data}
                        onChange={updateData}
                        spellCheck='false'/>
            </PrimaryInput>
            <button className='button-primary' onClick={doImport}>import</button>
            <ValidationMessages messages={this.props.errors}/>
            <InfoMessages messages={this.props.infos}/>
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
