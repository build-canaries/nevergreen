import React, {Component, Fragment} from 'react'
import {Title} from '../common/Title'
import {Typography} from './Typography'
import {Forms} from './Forms'
import {Layout} from './Layout'
import {Icons} from './Icons'

class StyleGuide extends Component {
  render() {
    return (
      <Fragment>
        <Title>Style Guide</Title>
        <Typography/>
        <Forms/>
        <Layout/>
        <Icons/>
      </Fragment>
    )
  }
}

export default StyleGuide
