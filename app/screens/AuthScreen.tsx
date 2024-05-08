import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, Modal, TextStyle, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Button, Screen, Text, TextField } from "app/components"
import { useAuth } from "app/services/database/use-auth"
import { colors, spacing } from "app/theme"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface AuthScreenProps extends AppStackScreenProps<"Auth"> { }

export const AuthScreen: FC<AuthScreenProps> = observer(function AuthScreen(_props) {
  const { loading, signIn, signUp, error,user} = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {navigation} = _props;

  const handleSignIn = async () => {
    signIn(email, password)
  }

  const handleSignUp = async () => {
    signUp(email, password)
  }

  useEffect(() => {
    if (user) {
      navigation.navigate("Welcome")
    }
  }, [user])



  return (
    <Screen style={$root} safeAreaEdges={['top']}>
      <Text preset={"subheading"}>PowerSync + Supabase</Text>
      <Text preset={"heading"}>Sign in or Create Account</Text>
      <TextField
        inputWrapperStyle={$inputWrapper}
        containerStyle={$inputContainer}
        label={"Email"}
        value={email}
        inputMode={"email"}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize={"none"}
      />

      <TextField
        containerStyle={$inputContainer}
        inputWrapperStyle={$inputWrapper}
        label={"Password"}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <View style={$buttonContainer}>
        <Button
          disabled={loading}
          text={"Sign In"}
          onPress={handleSignIn}
          style={$button}
          preset={"reversed"}
        />

        <Button
          disabled={loading}
          text={"Register New Account"}
          onPress={handleSignUp}
          style={$button}
        />
      </View>
      {error ? <Text style={$error} text={error} /> : null}
      <Modal transparent visible={ loading }>
        <View style={ $modalBackground }>
          <ActivityIndicator size="large" color={ colors.palette.primary500 }/>
        </View>
      </Modal>

    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
  justifyContent: 'center',
  paddingHorizontal: spacing.lg
}
const $inputWrapper: ViewStyle = {
  marginTop: spacing.md,
}
const $inputContainer: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
}
const $buttonContainer: ViewStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  marginVertical: spacing.md,
}

const $button: ViewStyle = {
  marginTop: spacing.xs,
}
const $error: TextStyle = {
  color: colors.error,
  marginVertical: spacing.md,
  textAlign: "center",
  width: "100%",
  fontSize: 20,
}
const $modalBackground: ViewStyle = {
  alignItems: "center",
  backgroundColor: "#00000040",
  flex: 1,
  flexDirection: "column",
  justifyContent: "space-around",
}