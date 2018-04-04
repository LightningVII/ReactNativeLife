import React from 'react'
import resolveAssetSource from 'resolveAssetSource'
import { View, ART, TouchableOpacity } from 'react-native'
import Avator from './Avator'
export default class PicDialog extends React.Component {
  artPath (dir, radius, w, h, triangle) {
    const startY = 0
    const startX = radius + (dir === 'rtl' ? triangle.width : 0)
    const width = w - radius * 2
    const height = h - radius * 2

    const triangleInitY = startY + h - triangle.top
    const triangleStart = triangleInitY - triangle.height / 2
    const triangleEnd = triangleInitY + triangle.height / 2
    const lineX = startX + w - radius
    const path = new ART.Path()
      .moveTo(startX, startY)
      .lineTo(startX + width, startY)
      .arc(radius, radius, radius)

    if (dir === 'ltr') {
      return path
        .lineTo(lineX, triangleStart)
        .lineTo(lineX + triangle.width, triangleInitY)
        .lineTo(lineX, triangleEnd)
        .lineTo(lineX, startY + radius + height)
        .arc(-radius, radius, radius)
        .lineTo(startX, startY + h)
        .arc(-radius, -radius, radius)
        .lineTo(lineX - w, startY + radius)
        .arc(radius, -radius, radius)
    } else {
      return path
        .lineTo(lineX, startY + radius + height)
        .arc(-radius, radius, radius)
        .lineTo(startX, startY + h)
        .arc(-radius, -radius, radius)
        .lineTo(lineX - w, triangleEnd)
        .lineTo(lineX - w - triangle.width, triangleInitY)
        .lineTo(lineX - w, triangleStart)
        .lineTo(lineX - w, startY + radius)
        .arc(radius, -radius, radius)
    }
  }

  render () {
    const { dir, avatar } = this.props
    const radius = 10
    const width = 100
    const height = 140
    const triangle = {
      top: 20,
      width: 5,
      height: 10
    }

    const path = this.artPath(dir, radius, width, height, triangle)

    const pattern = new ART.Pattern(
      this.props.message ||
        resolveAssetSource(require('../../../static/images/WechatIMG21.jpeg')),
      140,
      200,
      140,
      200
    )

    return (
      <View
        style={{
          height,
          marginBottom: 20,
          flexDirection: dir === 'ltr' ? 'row' : 'row-reverse'
        }}
      >
        <Avator dir={dir} src={avatar} />
        <TouchableOpacity activeOpacity={0.6}>
          <View
            style={{
              width: width + triangle.width,
              height,
              transform: [{ rotate: '180deg' }]
            }}
          >
            <ART.Surface width={width + triangle.width} height={height}>
              <ART.Shape
                d={path}
                stroke='#000000'
                fill={pattern}
                strokeWidth={0}
              />
            </ART.Surface>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

PicDialog.defaultProps = {
  dir: 'ltr',
  avatar: require('../../../static/images/record.png')
}
