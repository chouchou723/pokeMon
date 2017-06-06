import React from 'react'
import Inputs from './Inputs'
import { Accordion, Icon } from 'semantic-ui-react'

const FilterButton = ({handleToggle}) => (
    <Accordion>
      <Accordion.Title onClick={handleToggle}>
        <Icon name='dropdown' />
        タイプや条件で探す
      </Accordion.Title>
    </Accordion>
  )

export default FilterButton