import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { ViewStyle } from "react-native"
import {
  SignOutButton,
} from "app/components"
import { AppStackScreenProps } from "../navigators"
import { colors } from "../theme"
import { SafeAreaView } from "react-native-safe-area-context"


interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> { }

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen(
) {


  return (
    <SafeAreaView style={$container}>
      <SignOutButton />
    </SafeAreaView>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.palette.neutral300,
  display: "flex",
  justifyContent: "flex-start",
  height: "100%",
  flexDirection: "column",
}