import React from 'react'

export default function (ComposedComponent) {
  class ComposingComponent extends React.Component {
    constructor () {
      super()
      this.flag = null
      this.scrollerRef = null
      this.onScroll = this.onScroll.bind(this)
      this.forthOrBack = this.forthOrBack.bind(this)
      this.snapToInterval = this.snapToInterval.bind(this)
      this.getApproximateVal = this.getApproximateVal.bind(this)
    }

    trend (distance, space) {
      return space * (parseInt(distance / space) + 1) - distance < space / 2
    }

    roundVal (distance, space) {
      const backwordVal = distance - distance % space
      return isForth => {
        return backwordVal + (isForth ? space : 0)
      }
    }

    forthOrBack (distance, space) {
      return this.roundVal(distance, space)(this.trend(distance, space))
    }

    getApproximateVal (y, vy, isEnding) {
      const { velocityY } = this.props
      let approximateVal = 0
      const stepIntegerVal = Math.round(this.props.snapToInterval)
      if (isEnding) {
        if (vy > velocityY || vy < -velocityY) {
          return
        }
        approximateVal = this.forthOrBack(y, stepIntegerVal)
      } else {
        const roundVal = this.roundVal(y, stepIntegerVal)
        if (vy < velocityY && vy >= 0) {
          console.log('velocityY:', vy)
          approximateVal = roundVal(true)
        } else if (vy > -velocityY && vy < 0) {
          console.log('velocityYX:', vy)
          approximateVal = roundVal()
        } else {
          return
        }
      }
      return approximateVal
    }

    snapToInterval (e, isEnding) {
      if (this.flag) {
        const { contentOffset, velocity } = e.nativeEvent
        const { y } = contentOffset
        const { y: vy } = velocity
        const approximateVal = this.getApproximateVal(y, vy, isEnding)
        if (approximateVal || approximateVal === 0) {
          this.flag = false
          this.scrollerRef.scrollTo({
            y: y <= 0 ? 0 : approximateVal
          })
          const index = approximateVal / Math.round(this.props.snapToInterval)
          // console.log(
          //   'onScroll',
          //   index >= 10 ? 9 : index,
          //   approximateVal,
          //   Math.round(this.props.snapToInterval)
          // )
          this.props.cb && this.props.cb('', index >= 10 ? 9 : index)
        }
      }
    }

    onScroll (e) {
      // const { onScroll } = this.props
      // onScroll(e)
      // console.log('onScroll')
      // this.snapToInterval(e, false)
    }

    render () {
      const { onScroll, ...other } = this.props
      return (
        <ComposedComponent
          ref={el => {
            this.props.scrollRef(el)
            this.scrollerRef = el
          }}
          pagingEnabled
          scrollEventThrottle={8}
          showsVerticalScrollIndicator={false}
          onScroll={this.onScroll}
          onScrollBeginDrag={e => {
            this.flag = false
          }}
          onMomentumScrollEnd={e => {
            console.log('撞墙')
            this.snapToInterval(e, true)
          }}
          onScrollEndDrag={e => {
            this.flag = true
            this.snapToInterval(e, true)
          }}
          {...other}
        />
      )
    }
  }
  ComposingComponent.defaultProps = {
    velocityY: 0.7
  }
  return ComposingComponent
}
