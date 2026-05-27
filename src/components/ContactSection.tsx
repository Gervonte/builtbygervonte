'use client';

import { aboutData } from '@/lib/about';
import { useColorCombinations } from '@/lib/theme-aware-colors';
import {
  Alert,
  Anchor,
  Box,
  Button,
  Card,
  Container,
  Group,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Textarea,
  ThemeIcon,
  Title,
} from '@mantine/core';
import {
  IconAlertCircle,
  IconBrandGithub,
  IconBrandLinkedin,
  IconCheck,
  IconMail,
  IconMapPin,
  IconQuestionMark,
  IconSend,
} from '@tabler/icons-react';
import { memo, useEffect, useState } from 'react';
import { MobileTooltip } from './MobileTooltip';

const ContactSection = memo(() => {
  const { personalInfo } = aboutData;
  const colorCombinations = useColorCombinations();
  const [isClient, setIsClient] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Prevent hydration issues with browser extensions
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
        console.error('Form submission error:', result.error);
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Network error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: <IconMail size={24} />,
      title: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      description: 'Send me an email anytime',
    },
    {
      icon: <IconBrandLinkedin size={24} />,
      title: 'LinkedIn',
      value: 'Gervonte Fowler',
      href: personalInfo.linkedin,
      description: 'Connect with me professionally',
    },
    {
      icon: <IconBrandGithub size={24} />,
      title: 'GitHub',
      value: 'gervonte',
      href: personalInfo.github,
      description: 'Check out my code and projects',
    },
    {
      icon: <IconMapPin size={24} />,
      title: 'Location',
      value: personalInfo.location,
      href: undefined,
      description: 'Based in Central Florida, open to relocation',
    },
  ];

  return (
    <Container size="lg">
      <Stack gap="xl">
        {/* Header */}
        <Box ta="center" mb="xl">
          <Title
            order={2}
            size="h1"
            mb="md"
            style={{
              backgroundImage: colorCombinations.primaryGradient,
              backgroundSize: '100% 100%',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Let&apos;s Connect
          </Title>
          <Text size="xl" c="dimmed" maw={800} mx="auto">
            Ready to discuss opportunities, collaborate on projects, or just have a chat about
            technology?
          </Text>
        </Box>

        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
          {/* Contact Information */}
          <Stack gap="lg">
            <Title order={3} mb="md">
              Get in Touch
            </Title>
            <Text size="md" c="dimmed" mb="lg">
              I&apos;m always interested in hearing about new opportunities and exciting projects.
              Feel free to reach out through any of the channels below.
            </Text>

            <Stack gap="md">
              {contactMethods.map((method, index) => (
                <Card
                  key={index}
                  p="md"
                  withBorder
                  radius="lg"
                  style={{
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <Group gap="md">
                    {method.href ? (
                      <Anchor
                        href={method.href}
                        target={method.href.startsWith('http') ? '_blank' : undefined}
                        style={{ textDecoration: 'none' }}
                        aria-label={`${method.title} - ${method.description}`}
                      >
                        <ThemeIcon
                          color="sakura"
                          variant="light"
                          size="lg"
                          style={{
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.transform = 'scale(1.1)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        >
                          {method.icon}
                        </ThemeIcon>
                      </Anchor>
                    ) : (
                      <ThemeIcon
                        color="sakura"
                        variant="light"
                        size="lg"
                        style={{
                          cursor: 'default',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.transform = 'scale(1.1)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.transform = 'scale(1)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        {method.icon}
                      </ThemeIcon>
                    )}
                    <Box style={{ flex: 1 }}>
                      <Text fw={600} size="md" mb="xs">
                        {method.title}
                      </Text>
                      {method.href ? (
                        <Anchor
                          href={method.href}
                          target={method.href.startsWith('http') ? '_blank' : undefined}
                          c="sakura"
                          size="sm"
                          style={{ textDecoration: 'none' }}
                        >
                          {method.value}
                        </Anchor>
                      ) : (
                        <Text c="sakura" size="sm">
                          {method.value}
                        </Text>
                      )}
                      <Text size="xs" c="dimmed" mt="xs">
                        {method.description}
                      </Text>
                    </Box>
                  </Group>
                </Card>
              ))}
            </Stack>
          </Stack>

          {/* Contact Form */}
          <Stack gap="lg">
            <Group align="center" gap="xs" mb="md">
              <Title order={3}>Send a Quick Message</Title>
              <MobileTooltip
                label={
                  <Stack gap="xs">
                    <Text c="sakura" fw={600} size="sm">
                      How It Works
                    </Text>
                    <Text size="sm">Form sends email directly to my inbox via Resend API.</Text>
                    <Text size="sm">
                      I&apos;ll reply (within 24 hours), directly back to the email address provided
                      in the form.
                    </Text>
                  </Stack>
                }
                multiline
                withArrow
                withinPortal
                w={300}
              >
                <ThemeIcon
                  size="sm"
                  variant="light"
                  color="sakura"
                  style={{
                    cursor: 'help',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'scale(1.1)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <IconQuestionMark size={14} />
                </ThemeIcon>
              </MobileTooltip>
            </Group>
            <Text size="md" c="dimmed" mb="lg">
              Have a specific project in mind? Drop me a line and I&apos;ll get back to you as soon
              as possible.
            </Text>

            {isClient ? (
              <Card
                p="xl"
                withBorder
                radius="lg"
                style={{
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <form onSubmit={handleSubmit}>
                  <Stack gap="md">
                    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                      <TextInput
                        label="Name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={e => handleInputChange('name', e.target.value)}
                        required
                        radius="md"
                      />
                      <TextInput
                        label="Email"
                        placeholder="your.email@example.com"
                        type="email"
                        value={formData.email}
                        onChange={e => handleInputChange('email', e.target.value)}
                        required
                        radius="md"
                      />
                    </SimpleGrid>

                    <TextInput
                      label="Subject"
                      placeholder="What's this about?"
                      value={formData.subject}
                      onChange={e => handleInputChange('subject', e.target.value)}
                      required
                      radius="md"
                    />

                    <Textarea
                      label="Message"
                      placeholder="Tell me about your project, opportunity, or just say hello!"
                      value={formData.message}
                      onChange={e => handleInputChange('message', e.target.value)}
                      required
                      minRows={4}
                      radius="md"
                    />

                    {submitStatus === 'success' && (
                      <Alert
                        icon={<IconCheck size={16} />}
                        title="Message sent!"
                        color="sakura"
                        variant="light"
                      >
                        Thanks for reaching out! I&apos;ll get back to you soon.
                      </Alert>
                    )}

                    {submitStatus === 'error' && (
                      <Alert
                        icon={<IconAlertCircle size={16} />}
                        title="Error sending message"
                        color="red"
                        variant="light"
                      >
                        Something went wrong. Please try again or contact me directly via email.
                      </Alert>
                    )}

                    <Button
                      type="submit"
                      size="lg"
                      color="sakura"
                      loading={isSubmitting}
                      leftSection={<IconSend size={16} />}
                      radius="md"
                      fullWidth
                      style={{
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={e => {
                        if (!isSubmitting) {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                        }
                      }}
                      onMouseLeave={e => {
                        if (!isSubmitting) {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'none';
                        }
                      }}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </Stack>
                </form>
              </Card>
            ) : (
              <div
                style={{
                  minHeight: '400px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text size="lg" c="dimmed">
                  Loading contact form...
                </Text>
              </div>
            )}
          </Stack>
        </SimpleGrid>
      </Stack>
    </Container>
  );
});

ContactSection.displayName = 'ContactSection';

export default ContactSection;
