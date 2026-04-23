import { Section, Text, Row, Column } from '@react-email/components'
import { BaseLayout } from './components/BaseLayout'

interface AppointmentReminderProps {
  clientName: string
  businessName: string
  serviceName: string
  date: string
  startTime: string
}

export function AppointmentReminder({
  clientName,
  businessName,
  serviceName,
  date,
  startTime,
}: AppointmentReminderProps) {
  return (
    <BaseLayout preview={`Recordatorio: tu cita mañana con ${businessName}`}>
      <Text className="text-xl font-semibold text-gray-800">
        Recordatorio de cita 🗓️
      </Text>

      <Text className="text-gray-600">
        Hola <strong>{clientName}</strong>, te recordamos que mañana tienes
        una cita con <strong>{businessName}</strong>.
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
        ¡Te esperamos! Si necesitas cancelar, responde a este email.
      </Text>
    </BaseLayout>
  )
}

export default AppointmentReminder
