import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const object = formData.get('object') as string;
    const location = formData.get('location') as string;
    const projectType = formData.get('projectType') as string;
    const area = formData.get('area') as string;
    const file = formData.get('file') as File | null;

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return NextResponse.json(
        { error: 'Telegram configuration is missing' },
        { status: 500 }
      );
    }

    const message = `🏠 Новая заявка с сайта M9

👤 Имя: ${name}
📱 Телефон: ${phone}
🏢 Объект: ${object}
📍 Локация: ${location}
🎨 Тип проекта: ${projectType}
📐 Площадь: ${area} м²`;

    // Send text message
    const textResponse = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
        }),
      }
    );

    if (!textResponse.ok) {
      const error = await textResponse.text();
      console.error('Telegram API error:', error);
      return NextResponse.json(
        { error: 'Failed to send message to Telegram' },
        { status: 500 }
      );
    }

    // Send file if exists
    if (file) {
      const fileFormData = new FormData();
      fileFormData.append('chat_id', chatId);
      fileFormData.append('document', file);
      fileFormData.append('caption', `Планировка к заявке от ${name}`);

      const fileResponse = await fetch(
        `https://api.telegram.org/bot${token}/sendDocument`,
        {
          method: 'POST',
          body: fileFormData,
        }
      );

      if (!fileResponse.ok) {
        const error = await fileResponse.text();
        console.error('Telegram API error (file):', error);
        // Don't fail the whole request if file upload fails
      }
    }

    return NextResponse.json(
      { message: 'Заявка успешно отправлена!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}