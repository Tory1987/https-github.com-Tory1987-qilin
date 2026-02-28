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

interface InviteEmailProps {
  siteName: string
  siteUrl: string
  confirmationUrl: string
}

export const InviteEmail = ({
  siteName,
  siteUrl,
  confirmationUrl,
}: InviteEmailProps) => (
  <Html lang="vi" dir="ltr">
    <Head />
    <Preview>Bạn được mời tham gia {siteName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img src="https://wqxnprkfpjwrwrrqwlkm.supabase.co/storage/v1/object/public/email-assets/qilin-logo.png" width="64" height="64" alt="Qilin" style={logo} />
        <Heading style={h1}>Bạn được mời tham gia Qilin!</Heading>
        <Text style={text}>
          Bạn được mời tham gia{' '}
          <Link href={siteUrl} style={link}>
            <strong>{siteName}</strong>
          </Link>
          . Bấm nút bên dưới để chấp nhận lời mời và tạo tài khoản.
        </Text>
        <Button style={button} href={confirmationUrl}>
          Chấp nhận lời mời
        </Button>
        <Text style={footer}>
          Nếu bạn không mong đợi lời mời này, hãy bỏ qua email này nhé.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default InviteEmail

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
