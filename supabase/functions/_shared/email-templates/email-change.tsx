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
  Link,
  Preview,
  Text,
} from 'npm:@react-email/components@0.0.22'

interface EmailChangeEmailProps {
  siteName: string
  email: string
  newEmail: string
  confirmationUrl: string
}

export const EmailChangeEmail = ({
  siteName,
  email,
  newEmail,
  confirmationUrl,
}: EmailChangeEmailProps) => (
  <Html lang="vi" dir="ltr">
    <Head />
    <Preview>Xác nhận đổi email cho {siteName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img src="https://wqxnprkfpjwrwrrqwlkm.supabase.co/storage/v1/object/public/email-assets/qilin-logo.png" width="64" height="64" alt="Qilin" style={logo} />
        <Heading style={h1}>Xác nhận đổi email</Heading>
        <Text style={text}>
          Bạn đã yêu cầu đổi email cho tài khoản {siteName} từ{' '}
          <Link href={`mailto:${email}`} style={link}>
            {email}
          </Link>{' '}
          sang{' '}
          <Link href={`mailto:${newEmail}`} style={link}>
            {newEmail}
          </Link>
          .
        </Text>
        <Text style={text}>
          Bấm nút bên dưới để xác nhận thay đổi:
        </Text>
        <Button style={button} href={confirmationUrl}>
          Xác nhận đổi email
        </Button>
        <Text style={footer}>
          Nếu bạn không yêu cầu thay đổi này, vui lòng bảo mật tài khoản ngay.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default EmailChangeEmail

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
const link = { color: '#28a745', textDecoration: 'underline' }
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
