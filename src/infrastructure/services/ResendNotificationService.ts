import { resend } from '@infrastructure/lib/resend'
import { INotificationService } from '@application/interfaces/INotificationService'
import { Appointment } from '@domain/entities/Appointment'
import { Business } from '@domain/entities/Business'
import { AppointmentConfirmation } from '@emails/AppointmentConfirmation'
import { AppointmentReminder } from '@emails/AppointmentReminder'
import { AppointmentCancellation } from '@emails/AppointmentCancellation'
import { render } from 'react-email'

export class ResendNotificationService implements INotificationService {
  private readonly fromEmail = 'Agendly <noreply@agendly.app>'

  async sendConfirmation(props: {
    appointment: Appointment
    business: Business
  }): Promise<void> {
    const { appointment, business } = props

    const html = await render(
      AppointmentConfirmation({
        clientName: appointment.clientName,
        businessName: business.name,
        serviceName: business.serviceName,
        date: appointment.date,
        startTime: appointment.startTime,
      })
    )

    await resend.emails.send({
      from: this.fromEmail,
      to: appointment.clientEmail,
      subject: `Cita confirmada con ${business.name}`,
      html,
    })
  }

  async sendReminder(props: {
    appointment: Appointment
    business: Business
  }): Promise<void> {
    const { appointment, business } = props

    const html = await render(
      AppointmentReminder({
        clientName: appointment.clientName,
        businessName: business.name,
        serviceName: business.serviceName,
        date: appointment.date,
        startTime: appointment.startTime,
      })
    )

    await resend.emails.send({
      from: this.fromEmail,
      to: appointment.clientEmail,
      subject: `Recordatorio: tu cita mañana con ${business.name}`,
      html,
    })
  }

  async sendCancellation(props: {
    appointment: Appointment
    business: Business
  }): Promise<void> {
    const { appointment, business } = props

    const html = await render(
      AppointmentCancellation({
        clientName: appointment.clientName,
        businessName: business.name,
        serviceName: business.serviceName,
        date: appointment.date,
        startTime: appointment.startTime,
        businessSlug: business.slug,
      })
    )

    await resend.emails.send({
      from: this.fromEmail,
      to: appointment.clientEmail,
      subject: `Tu cita con ${business.name} fue cancelada`,
      html,
    })
  }
}
