import React from 'react'
import resolveAssetSource from 'resolveAssetSource'
import { View, ART } from 'react-native'

export default class App extends React.Component {
  render () {
    const radius = 10
    const width = 80 + radius * 2
    const height = 140 + radius * 2
    const startY = 4
    const startX = 30
    const triangle = {
      top: 12,
      width: 4,
      height: 10
    }
    const reserveTriangleTop = height + triangle.height - triangle.top

    const path = new ART.Path()
      .moveTo(startX, startY)
      .lineTo(startX + width, startY)
      .arc(radius, radius, radius)
      .lineTo(startX + width + radius, startY + radius + height - triangle.top)
      .lineTo(
        startX + width + radius + triangle.width,
        startY + radius + height - triangle.top + triangle.height / 2
      )
      .lineTo(
        startX + width + radius,
        startY + radius + height - triangle.top + triangle.height
      )
      .lineTo(startX + width + radius, startY + radius + height)
      .arc(-radius, radius, radius)
      .lineTo(startX, startY + radius * 2 + height)
      .arc(-radius, -radius, radius)
      .lineTo(startX - radius, startY + radius)
      .arc(radius, -radius, radius)

    const path2 = new ART.Path()
      .moveTo(startX, startY)
      .lineTo(startX + width, startY)
      .arc(radius, radius, radius)
      .lineTo(startX + width + radius, startY + radius + height)
      .arc(-radius, radius, radius)
      .lineTo(startX, startY + radius * 2 + height)
      .arc(-radius, -radius, radius)
      .lineTo(startX - radius, startY + radius + reserveTriangleTop)
      .lineTo(
        startX - radius - triangle.width,
        startY + radius + reserveTriangleTop - triangle.height / 2
      )
      .lineTo(
        startX - radius,
        startY + radius + reserveTriangleTop - triangle.height
      )
      .lineTo(startX - radius, startY + radius)
      .arc(radius, -radius, radius)

    console.log(path2)

    const pattern = new ART.Pattern(this.props.message || resolveAssetSource(require('../../../static/images/WechatIMG21.jpeg')), 140, 200, 140, 200)
    return (
      <View
        style={{
          height: 200
        }}
      >
        <View
          style={{
            width: 160,
            height: 200,
            transform: [
              { rotate: '180deg' }
              // { translateX: 340 - 160 }
            ]
          }}
        >
          <ART.Surface width={160} height={190}>
            <ART.Shape
              d={path}
              stroke='#000000'
              fill={pattern}
              strokeWidth={0}
            />
          </ART.Surface>
        </View>
        {/* <View
          style={{
            width: 160,
            transform: [
              { rotate: '180deg' }
              // { translateX: 200 }
            ]
          }}
        >
          <ART.Surface width={160} height={190}>
            <ART.Shape
              d={path2}
              stroke='#000000'
              fill={pattern}
              strokeWidth={0}
            />
          </ART.Surface>
        </View> */}
      </View>
    )
  }
}
