import { Section, Text, Row, Column } from '@react-email/components'
import { BaseLayout } from './components/BaseLayout'

interface AppointmentConfirmationProps {
  clientName: string
  businessName: string
  serviceName: string
  date: string
  startTime: string
}

export function AppointmentConfirmation({
  clientName,
  businessName,
  serviceName,
  date,
  startTime,
}: AppointmentConfirmationProps) {
  return (
    <BaseLayout preview={`Tu cita con ${businessName} está confirmada`}>
      <Text className="text-xl font-semibold text-gray-800">
        ¡Tu cita está confirmada! ✅
      </Text>

      <Text className="text-gray-600">
        Hola <strong>{clientName}</strong>, tu cita con{' '}
        <strong>{businessName}</strong> ha sido agendada exitosamente.
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
        Si necesitas cancelar o reagendar, responde a este email.
      </Text>
    </BaseLayout>
  )
}

export default AppointmentConfirmation
