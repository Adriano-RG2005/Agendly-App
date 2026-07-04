import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface BaseLayoutProps {
  preview: string;
  children: React.ReactNode;
}

export function BaseLayout({ preview, children }: BaseLayoutProps) {
  return (
    <Html lang="es">
      <Head />
      <Preview>{preview}</Preview>
      <Tailwind>
        <Body className="bg-gray-50 font-sans">
          <Container className="mx-auto max-w-[480px] bg-white rounded-lg my-8 p-8 shadow-sm">
            <Section className="mb-6">
              <Text className="text-2xl font-bold text-indigo-600 m-0">
                Agendly
              </Text>
            </Section>
            {children}
            <Section className="mt-8 border-t border-gray-100 pt-4">
              <Text className="text-xs text-gray-400 text-center m-0">
                © {new Date().getFullYear()} Agendly. Todos los derechos
                reservados.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
