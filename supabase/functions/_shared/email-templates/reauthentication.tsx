/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Text,
} from 'npm:@react-email/components@0.0.22'

interface ReauthenticationEmailProps {
  token: string
}

export const ReauthenticationEmail = ({ token }: ReauthenticationEmailProps) => (
  <Html lang="vi" dir="ltr">
    <Head />
    <Preview>Mã xác thực của bạn</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img src="https://wqxnprkfpjwrwrrqwlkm.supabase.co/storage/v1/object/public/email-assets/qilin-logo.png" width="64" height="64" alt="Qilin" style={logo} />
        <Heading style={h1}>Mã xác thực</Heading>
        <Text style={text}>Dùng mã bên dưới để xác nhận danh tính của bạn:</Text>
        <Text style={codeStyle}>{token}</Text>
        <Text style={footer}>
          Mã này sẽ hết hạn sau một thời gian ngắn. Nếu bạn không yêu cầu mã này, hãy bỏ qua email này nhé.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default ReauthenticationEmail

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
const codeStyle = {
  fontFamily: 'Courier, monospace',
  fontSize: '28px',
  fontWeight: '800' as const,
  color: '#28a745',
  margin: '0 0 30px',
  letterSpacing: '4px',
}
const footer = { fontSize: '12px', color: '#9ca3af', margin: '30px 0 0', textAlign: 'left' as const }
