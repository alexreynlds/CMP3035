import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import Button from '../components/buttons'
import { useFonts, ChakraPetch_400Regular } from '@expo-google-fonts/dev'

// format numbers as strings such that 2 -> '02'
const formatNumeric = (x) => ('0' + x).slice(-2)

export default function Stopwatch() {
  let [fontsLoaded] = useFonts({
    ChakraPetch_400Regular,
  })

  // centiseconds are equivalent to seconds/100.
  const [centisecs, setCentisecs] = useState(0)

  // isCounting controls whether the stopwatch is on/off.
  const [isCounting, setStartStop] = useState(false)

  // startTime stores the time the stopwatch started.
  const [startTime, setStartTime] = useState(0)

  // TODO: Add function to setTimeout to make useEffect work.
  useEffect(() => {
    if (isCounting) {
      // setTimeout(() => setCentisecs(centisecs + 1), 10)
      setTimeout(
        () => setCentisecs(Math.floor((Date.now() - startTime) / 10)),
        10,
      )
    }
  })

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.clock}>
          {/* TODO: Format stopwatch time as <minutes>:<seconds>.<centiseconds> */}
          {/* <Text style={styles.digits}></Text> */}
          <View style={styles.digits}>
            <Text style={styles.digitSec}>
              {formatNumeric(Math.floor(centisecs / 6000))}
            </Text>
            <Text style={styles.digitSep}>:</Text>
            <Text style={styles.digitSec}>
              {formatNumeric(Math.floor((centisecs / 100) % 60))}
            </Text>
            <Text style={styles.digitSep}>:</Text>
            <Text style={styles.digitSec}>
              {formatNumeric(centisecs % 100)}
            </Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            style={{ backgroundColor: '#60615f' }}
            title="Reset"
            onPress={() => (
              setStartStop(false), setTimeout(() => setCentisecs(0), 10)
            )}
          />
          {/* TODO: Add functionality to the start/stop button. */}
          <Button
            style={{ backgroundColor: isCounting ? '#ed3b53' : '#60bd31' }}
            title={isCounting ? 'Stop' : 'Start'}
            // onPress={() => undefined}
            onPress={() => {
              if (!isCounting) {
                setStartTime(Date.now())
                setStartStop(true)
              } else {
                setStartStop(false)
              }
            }}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'start',
  },
  clock: {
    flex: 3,
    justifyContent: 'center',
  },
  digits: {
    display: 'flex',
    flexDirection: 'row',
  },
  digitSec: {
    fontFamily: 'Courier New',
    fontSize: 70,
    textAlign: 'center',
  },
  digitSep: {
    fontFamily: 'Courier New',
    fontSize: 70,
    textAlign: 'center',
  },
})
