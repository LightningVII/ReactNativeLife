import React from 'react'
import { View, ART, TouchableOpacity, ImageBackground } from 'react-native'
import Avator from './Avator'
export default class PicDialog extends React.Component {
  artPath (dir, radius, w, h, triangle) {
    const width = w + triangle.width // width
    const height = h // 140
    const triangleX = radius + triangle.width // 15
    const rTriangleX = width - triangleX

    if (dir === 'ltr') {
      return new ART.Path()
        .moveTo(triangleX, height)
        .arc(-radius, -radius, radius)
        .lineTo(triangle.width, triangle.top + triangle.height / 2)
        .lineTo(0, triangle.top)
        .lineTo(triangle.width, triangle.top - triangle.height / 2)
        .lineTo(triangle.width, radius)
        .arc(radius, -radius, radius)
        .moveTo(triangleX, 0)
        .lineTo(0, 0)
        .lineTo(0, height)
        .lineTo(triangleX, height)
    } else {
      return new ART.Path()
        .moveTo(rTriangleX, 0)
        .arc(radius, radius, radius)
        .lineTo(w, radius)
        .lineTo(w, triangle.top - triangle.height / 2)
        .lineTo(width, triangle.top)
        .lineTo(w, triangle.top + triangle.height / 2)
        .lineTo(w, height - radius)
        .arc(-radius, radius, radius)
        .moveTo(rTriangleX, height)
        .lineTo(width, height)
        .lineTo(width, 0)
        .lineTo(rTriangleX, 0)
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
          <ImageBackground
            source={require('../../../static/images/WechatIMG21.jpeg')}
            style={{
              borderRadius: 10,
              overflow: 'hidden',
              width: width + triangle.width - 0.5,
              height: height - 0.5
            }}
          >
            <ART.Surface
              fill={'#fff'}
              width={width + triangle.width}
              height={height}
            >
              <ART.Shape
                stroke='#000000'
                d={path}
                fill={'#fff'}
                strokeWidth={0}
              >
                <ART.Pattern />
              </ART.Shape>
            </ART.Surface>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    )
  }
}

PicDialog.defaultProps = {
  dir: 'ltr',
  avatar: require('../../../static/images/record.png')
}
