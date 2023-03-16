import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ActivityIndicator, Alert } from 'react-native'
import Button from '../components/buttons'
import { useFonts, ChakraPetch_400Regular } from '@expo-google-fonts/dev'

const formatNumeric = (x) => ('0' + x).slice(-2)

export default function Timer(props) {
  const { navigate } = props.navigation

  // Retrieve seconds from route params
  const [seconds, setSeconds] = useState(props.route.params.seconds)

  // startTime stores the time the timer started.
  const [startTime, setStartTime] = useState(props.route.params.seconds)

  // isPaused controls whether the timer is on/off
  const [isPaused, setPause] = useState(false)
  let [fontsLoaded] = useFonts({
    ChakraPetch_400Regular,
  })

  const test = () => {
    setPause(true)
    setTimeout(() => setSeconds(startTime), 10)
  }

  // TODO: Add a useEffect function that updates the timer when seconds > 0
  // and creates an alert when seconds = 0 to navigate back to the timer input screen
  useEffect(() => {
    if (seconds === 0) {
      Alert.alert('Time is up!', 'Returning to timer input screen', [
        {
          text: 'OK',
          onPress: () => navigate('TimerInput'),
        },
      ])
    } else if (!isPaused) {
      setTimeout(() => setSeconds(seconds - 1), 10)
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
          {/* TODO: Format timer time as <hours>:<minutes>:<seconds> */}
          <View style={styles.digits}>
            <Text style={styles.digitSec}>
              {formatNumeric(Math.floor(seconds / 3600))}
            </Text>
            <Text style={styles.digitSep}>:</Text>
            <Text style={styles.digitSec}>
              {formatNumeric(Math.floor((seconds / 60) % 60))}
            </Text>
            <Text style={styles.digitSep}>:</Text>
            <Text style={styles.digitSec}>{formatNumeric(seconds % 60)}</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          {/* TODO: Add functionality to the reset button. 
               Reset should navigate the user back to the Timer input page */}
          <Button
            style={{ backgroundColor: '#60615f' }}
            title="Reset"
            onPress={test}
          />
          {/* TODO: Add functionality to the start/pause button. This should interrupt or resume timing. */}
          <Button
            style={{ backgroundColor: isPaused ? '#60bd31' : '#ed3b53' }}
            title={isPaused ? 'Start' : 'Pause'}
            onPress={() => setPause(!isPaused)}
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
  inputContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 3,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
  subheading: {
    fontSize: 30,
    flex: 1,
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
