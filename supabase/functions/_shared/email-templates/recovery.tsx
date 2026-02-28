/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Text,
} from 'npm:@react-email/components@0.0.22'

interface RecoveryEmailProps {
  siteName: string
  confirmationUrl: string
}

export const RecoveryEmail = ({
  siteName,
  confirmationUrl,
}: RecoveryEmailProps) => (
  <Html lang="vi" dir="ltr">
    <Head />
    <Preview>Đặt lại mật khẩu cho {siteName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img src="https://wqxnprkfpjwrwrrqwlkm.supabase.co/storage/v1/object/public/email-assets/qilin-logo.png" width="64" height="64" alt="Qilin" style={logo} />
        <Heading style={h1}>Đặt lại mật khẩu</Heading>
        <Text style={text}>
          Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản {siteName} của bạn. Bấm nút bên dưới để chọn mật khẩu mới.
        </Text>
        <Button style={button} href={confirmationUrl}>
          Đặt lại mật khẩu
        </Button>
        <Text style={footer}>
          Nếu bạn không yêu cầu đặt lại mật khẩu, hãy bỏ qua email này. Mật khẩu của bạn sẽ không thay đổi.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default RecoveryEmail

const main = { backgroundColor: '#ffffff', fontFamily: 'Nunito, Arial, sans-serif' }
const container = { padding: '30px 25px', textAlign: 'center' as const }
const logo = { margin: '0 auto 16px' }
const h1 = {
  fontSize: '24px',
  fontWeight: '800' as const,
  color: '#1f2937',
  margin: '0 0 20px',
}
const text = {
  fontSize: '15px',
  color: '#6b7280',
  lineHeight: '1.6',
  margin: '0 0 25px',
  textAlign: 'left' as const,
}
const button = {
  backgroundColor: '#28a745',
  color: '#ffffff',
  fontSize: '15px',
  fontWeight: '700' as const,
  borderRadius: '16px',
  padding: '14px 28px',
  textDecoration: 'none',
}
const footer = { fontSize: '12px', color: '#9ca3af', margin: '30px 0 0', textAlign: 'left' as const }
