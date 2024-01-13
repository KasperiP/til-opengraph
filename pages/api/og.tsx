/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

const fontRegular = fetch(
  new URL('../../assets/Montserrat-Regular.ttf', import.meta.url),
).then((res) => res.arrayBuffer());

const fontBold = fetch(
  new URL('../../assets/Montserrat-Bold.ttf', import.meta.url),
).then((res) => res.arrayBuffer());

export default async function handler(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const title = searchParams.get('title') ?? 'Failed to load title :(';
  const author = searchParams.get('author') ?? 'Kasperi Pohtinen';
  const published = searchParams.get('published') ?? '2021-09-01';
  const image = searchParams.get('image');

  const fontDataRegular = await fontRegular;
  const fontDataBold = await fontBold;

  return new ImageResponse(
    (
      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#fef08a',
          width: '100%',
          height: '100%',
          padding: '4rem',
          fontFamily: 'Montserrat',
          color: '#202125',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <h2
            style={{
              fontSize: '3rem',
            }}
          >
            <span style={{ fontFamily: 'MontserratBold' }}>TIL</span> Today I
            Learned
          </h2>
        </div>
        <div
          style={{
            fontSize: '3.8rem',
            fontFamily: 'MontserratBold',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            flex: 1,
            overflow: 'hidden',
          }}
        >
          <p
            style={{
              margin: 0,
              lineClamp: 3,
              display: 'block',
            }}
          >
            {title}
          </p>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '1rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                background: '#bfdbfe',
                borderRadius: '50%',
                width: 100,
                height: 100,
              }}
            >
              {image && (
                <img
                  style={{ borderRadius: '50%' }}
                  width="100"
                  height="100"
                  alt="Image"
                  src={image}
                />
              )}
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontFamily: 'MontserratBold',
                  fontSize: '2rem',
                }}
              >
                {author}
              </h3>
              <p style={{ margin: 0, fontSize: '1.5rem' }}>
                {' '}
                Published: {published}
              </p>
            </div>
          </div>
        </div>
      </main>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'MontserratRegular',
          data: fontDataRegular,
          style: 'normal',
        },
        {
          name: 'MontserratBold',
          data: fontDataBold,
          style: 'normal',
        },
      ],
    },
  );
}
