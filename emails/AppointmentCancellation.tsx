import { Section, Text, Row, Column } from '@react-email/components'
import { BaseLayout } from './components/BaseLayout'

interface AppointmentCancellationProps {
  clientName: string
  businessName: string
  serviceName: string
  date: string
  startTime: string
  businessSlug: string
}

export function AppointmentCancellation({
  clientName,
  businessName,
  serviceName,
  date,
  startTime,
  businessSlug,
}: AppointmentCancellationProps) {
  const bookingUrl = `${process.env.NEXT_PUBLIC_APP_URL}/${businessSlug}`

  return (
    <BaseLayout preview={`Tu cita con ${businessName} fue cancelada`}>
      <Text className="text-xl font-semibold text-gray-800">
        Cita cancelada ❌
      </Text>

      <Text className="text-gray-600">
        Hola <strong>{clientName}</strong>, tu cita con{' '}
        <strong>{businessName}</strong> ha sido cancelada.
      </Text>

      <Section className="bg-gray-50 rounded-lg p-4 my-4">
        <Row className="mb-2">
          <Column className="text-gray-500 text-sm">Servicio</Column>
          <Column className="text-gray-800 font-medium text-sm text-right">
            {serviceName}
          </Column>
        </Row>
        <Row className="mb-2">
          <Column className="text-gray-500 text-sm">Fecha</Column>
          <Column className="text-gray-800 font-medium text-sm text-right">
            {date}
          </Column>
        </Row>
        <Row>
          <Column className="text-gray-500 text-sm">Hora</Column>
          <Column className="text-gray-800 font-medium text-sm text-right">
            {startTime}
          </Column>
        </Row>
      </Section>

      <Text className="text-gray-500 text-sm">
        Si deseas reagendar puedes hacerlo desde{' '}
        <a href={bookingUrl} className="text-indigo-600">
          aquí
        </a>
        .
      </Text>
    </BaseLayout>
  )
}

export default AppointmentCancellation
