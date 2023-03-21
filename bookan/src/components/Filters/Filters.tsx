import { Box, Checkbox, Flex, RangeSlider, RangeSliderFilledTrack, RangeSliderMark, RangeSliderThumb, RangeSliderTrack, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Publisher } from '../../Model/Publisher'
import { useApplicationStore } from '../../stores/store'
import { FiDollarSign } from 'react-icons/fi'
import { QueryParams } from '../../types/QueryParams'
import { useLocation, useNavigate } from 'react-router-dom'

interface Props {
    sliderValue: number[]
    selectedPublishers: string[]
    publisherSelected: (val: string) => void
    publisherDeselected: (val: string) => void
    sliderValueChanged: (sliderValue: number[]) => void
}

export const Filters = ({
    sliderValueChanged,
    sliderValue,
    publisherSelected,
    publisherDeselected,
    selectedPublishers
}: Props) => {
    const getPublishers = useApplicationStore(state => state.getPublishers)
    const publishers = useApplicationStore(state => state.publishers)

    const init = async () => {
        await getPublishers()
    }
    useEffect(() => {
        init()
    }, [])

    const handleCheckbox = (flag: boolean, publisher: string) => {
        if (flag)
            return publisherSelected(publisher)
        publisherDeselected(publisher)
    }

    return (
        <Flex direction={'column'} padding={'50px'}>
            <Flex direction={'column'} justifyContent={'center'}>
                <Text fontWeight={'500'}>IZDAVACI</Text>
                {publishers.data && publishers.data.map((publisher: Publisher) => {
                    return (
                        <Checkbox
                            isChecked={selectedPublishers.includes(publisher.name)}
                            key={publisher.id}
                            onChange={(e: any) => handleCheckbox(e.target.checked, publisher.name)}>
                            {publisher.name}
                        </Checkbox>
                    )
                })}
            </Flex>
            <Flex direction={'column'} justifyContent={'center'}>
                <Text fontWeight={'500'} mb={'30px'}>CENA</Text>
                <RangeSlider defaultValue={[0, 5000]} aria-label={['min', 'max']} min={0} max={5000} onChange={(val) => sliderValueChanged(val)} onChangeEnd={(val) => sliderValueChanged(val)}>
                    <RangeSliderMark
                        value={sliderValue[0]}
                        textAlign='center'
                        color='black'
                        mt='-10'
                        ml='-5'
                        w='15'
                    >
                        {sliderValue[0]}RSD
                    </RangeSliderMark>
                    <RangeSliderMark
                        value={sliderValue[1]}
                        textAlign='center'
                        color='black'
                        mt='-10'
                        ml='-5'
                        w='15'
                    >
                        {sliderValue[1]}RSD
                    </RangeSliderMark>
                    <RangeSliderTrack bg='red.100'>
                        <RangeSliderFilledTrack bg='tomato' />
                    </RangeSliderTrack>
                    <RangeSliderThumb boxSize={6} index={0}>
                        <Box color='tomato' as={FiDollarSign} />
                    </RangeSliderThumb>
                    <RangeSliderThumb boxSize={6} index={1}>
                        <Box color='tomato' as={FiDollarSign} />
                    </RangeSliderThumb>
                </RangeSlider>
            </Flex>
        </Flex >
    )
}
