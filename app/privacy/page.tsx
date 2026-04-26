import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <main className="page-main">
      <div className="container" style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px' }}>
        <div className="page-header" style={{ marginBottom: 40 }}>
          <div className="section-kicker">Хууль, эрх зүй</div>
          <h1>Нууцлалын бодлого</h1>
          <p className="small-meta" style={{ marginTop: 8 }}>
            Сүүлд шинэчлэгдсэн: 2025 оны 05-р сарын 01
          </p>
        </div>

        <div style={{ lineHeight: 1.85, color: 'var(--text)', fontSize: '0.97rem' }}>

          <section style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: '1.15rem', marginBottom: 12 }}>1. Ерөнхий зүйл</h2>
            <p>
              Энэхүү Нууцлалын бодлого нь <strong>Очир Нью Софт ХХК</strong> (цаашид "Компани" гэх)-ийн эзэмшдэг
              <strong> uuruu.mn</strong> платформ (цаашид "Платформ" гэх)-ыг ашигладаг хэрэглэгчдийн хувийн мэдээллийг
              хэрхэн цуглуулж, ашиглаж, хамгаалж байгааг тодорхойлно. Платформыг ашигласнаар та энэхүү бодлогыг
              бүрэн хүлээн зөвшөөрсөнд тооцогдоно.
            </p>
            <p style={{ marginTop: 12 }}>
              Манай платформ нь Монгол Улсын <strong>Хувийн мэдээлэл хамгаалах тухай хууль (2021)</strong> болон
              холбогдох бусад хууль тогтоомжийн хүрээнд үйл ажиллагаагаа явуулна.
            </p>
          </section>

          <section style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: '1.15rem', marginBottom: 12 }}>2. Цуглуулах мэдээлэл</h2>
            <p>Бид дараах мэдээллийг цуглуулна:</p>
            <ul style={{ paddingLeft: 20, marginTop: 10 }}>
              <li style={{ marginBottom: 8 }}><strong>Бүртгэлийн мэдээлэл:</strong> Нэр, и-мэйл хаяг, утасны дугаар</li>
              <li style={{ marginBottom: 8 }}><strong>Зар байршуулалтын мэдээлэл:</strong> Үл хөдлөхийн байршил, үнэ, тодорхойлолт, зураг</li>
              <li style={{ marginBottom: 8 }}><strong>Төлбөрийн мэдээлэл:</strong> QPay болон банкны гүйлгээний баталгаажуулалтын мэдээлэл (картын дугаар хадгалагдахгүй)</li>
              <li style={{ marginBottom: 8 }}><strong>Техникийн мэдээлэл:</strong> IP хаяг, браузерийн төрөл, платформд нэвтрэх цаг, хуудас үзэх түүх</li>
              <li style={{ marginBottom: 8 }}><strong>Харилцааны мэдээлэл:</strong> Бидэнтэй холбогдсон и-мэйл, дуудлага</li>
            </ul>
          </section>

          <section style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: '1.15rem', marginBottom: 12 }}>3. Мэдээллийг ашиглах зорилго</h2>
            <p>Цуглуулсан мэдээллийг бид дараах зорилгоор ашиглана:</p>
            <ul style={{ paddingLeft: 20, marginTop: 10 }}>
              <li style={{ marginBottom: 8 }}>Бүртгэл, нэвтрэх эрхийг удирдах</li>
              <li style={{ marginBottom: 8 }}>Зар байршуулах, удирдах үйлчилгээ үзүүлэх</li>
              <li style={{ marginBottom: 8 }}>Төлбөр хүлээн авах, баталгаажуулах</li>
              <li style={{ marginBottom: 8 }}>Хэрэглэгчийн асуулга, гомдолд хариу өгөх</li>
              <li style={{ marginBottom: 8 }}>Платформын аюулгүй байдлыг хангах, луйварчдаас урьдчилан сэргийлэх</li>
              <li style={{ marginBottom: 8 }}>Үйлчилгээний чанарыг сайжруулах зорилгоор статистик шинжилгээ хийх</li>
              <li style={{ marginBottom: 8 }}>Хуулийн үүргээ биелүүлэх</li>
            </ul>
          </section>

          <section style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: '1.15rem', marginBottom: 12 }}>4. Гуравдагч талд мэдээлэл дамжуулах</h2>
            <p>Бид таны хувийн мэдээллийг гуравдагч талд <strong>дараах тохиолдолд</strong> дамжуулж болно:</p>
            <ul style={{ paddingLeft: 20, marginTop: 10 }}>
              <li style={{ marginBottom: 8 }}><strong>Таны зөвшөөрлөөр:</strong> Зар дахь утасны дугаарыг харах зөвшөөрлийг өгсөн тохиолдолд</li>
              <li style={{ marginBottom: 8 }}><strong>Төлбөрийн үйлчилгээ:</strong> QPay болон банкны систем — зөвхөн гүйлгээ баталгаажуулахад</li>
              <li style={{ marginBottom: 8 }}><strong>Хуулийн шаардлагаар:</strong> Шүүх, хууль сахиулах байгууллагын хуулийн дагуу гаргасан хүсэлтийн дагуу</li>
              <li style={{ marginBottom: 8 }}><strong>Аюулгүй байдлын зорилгоор:</strong> Луйвар, гэмт хэргийг таслан зогсоох</li>
            </ul>
            <p style={{ marginTop: 12 }}>
              Бид таны мэдээллийг <strong>борлуулахгүй, арилжаалахгүй</strong> бөгөөд зар сурталчилгааны зорилгоор гуравдагч талд шилжүүлэхгүй.
            </p>
            <p style={{ marginTop: 12 }}>
              Платформын хэвийн ажиллагааг хангах зорилгоор гуравдагч талын техникийн үйлчилгээ <strong>(сервер, өгөгдлийн сан гэх мэт)</strong> ашиглаж болох бөгөөд эдгээр үйлчилгээ үзүүлэгчид нь мэдээллийг зөвхөн шаардлагатай хэмжээнд боловсруулна.
            </p>
          </section>

          <section style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: '1.15rem', marginBottom: 12 }}>5. Утасны дугаар харуулах тухай</h2>
            <p>
              Зарын утасны дугаарыг харахын тулд хэрэглэгч <strong>"Утасаар ярих"</strong> товчийг дарж,
              манай үйлчилгээний нөхцөл болон нууцлалын бодлогыг зөвшөөрөх шаардлагатай.
            </p>
            <p style={{ marginTop: 12 }}>
              Утасны дугаарыг <strong>спам, луйвар болон бусад хууль бус зорилгоор</strong> ашиглахыг хатуу хориглоно. Зөрчсөн тохиолдолд хуулийн дагуу хариуцлага хүлээнэ.
            </p>
          </section>

          <section style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: '1.15rem', marginBottom: 12 }}>6. Мэдээлэл хадгалах хугацаа</h2>
            <ul style={{ paddingLeft: 20, marginTop: 10 }}>
              <li style={{ marginBottom: 8 }}>Бүртгэлийн мэдээлэл — Бүртгэлийг устгах хүртэл</li>
              <li style={{ marginBottom: 8 }}>Зарын мэдээлэл — Зарын хугацаа дуусснаас хойш 90 хоног</li>
              <li style={{ marginBottom: 8 }}>Төлбөрийн мэдээлэл — Хуулийн дагуу 5 жил</li>
              <li style={{ marginBottom: 8 }}>Техникийн лог — 30 хоног</li>
            </ul>
          </section>

          <section style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: '1.15rem', marginBottom: 12 }}>7. Таны эрх</h2>
            <ul style={{ paddingLeft: 20, marginTop: 10 }}>
              <li style={{ marginBottom: 8 }}>Өөрийн мэдээллийг үзэх, засварлах эрх</li>
              <li style={{ marginBottom: 8 }}>Мэдээллийг устгах хүсэлт гаргах эрх</li>
              <li style={{ marginBottom: 8 }}>Мэдээлэл боловсруулахыг хязгаарлах хүсэлт гаргах эрх</li>
              <li style={{ marginBottom: 8 }}>Зөвшөөрлөө цуцлах эрх</li>
              <li style={{ marginBottom: 8 }}>Компани нь хэрэглэгчийн хүсэлтийн дагуу хувийн мэдээллийг устгах бөгөөд,
хуульд заасан хугацаанд хадгалах шаардлагатай мэдээллийг эс тооцно.</li>
            </ul>
          </section>

          <section style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: '1.15rem', marginBottom: 12 }}>8. Аюулгүй байдал</h2>
            <p>
              Бид таны мэдээллийг хамгаалахын тулд SSL шифрлэлт, хандалтын хяналт, мэдээллийн баазын аюулгүй байдал зэрэг стандарт арга хэмжээг хэрэгжүүлнэ.
            </p>
            <p>
              Гэсэн хэдий ч интернет орчинд 100% аюулгүй байдлыг бүрэн баталгаажуулах боломжгүйг анхаарна уу.
            </p>
          </section>

          <section style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: '1.15rem', marginBottom: 12 }}>9. Күүки (Cookie) ашиглалт</h2>
            <p>
              Платформ нь хэрэглэгчийн нэвтрэлтийн мэдээлэл хадгалахад күүки ашиглана. Та браузерийнхаа тохиргооноос күүкиг хаах боломжтой боловч зарим үйлчилгээ ажиллахгүй болж болзошгүй.
            </p>
          </section>

          <section style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: '1.15rem', marginBottom: 12 }}>10. Бодлогод өөрчлөлт оруулах</h2>
            <p>
              Бид энэхүү нууцлалын бодлогыг шаардлагатай үед шинэчлэх эрхтэй. Өөрчлөлт орсон тохиолдолд платформд мэдэгдэл байршуулж, шинэчлэгдсэн огноог заана.
            </p>
          </section>

          <section style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: '1.15rem', marginBottom: 12 }}>11. Холбоо барих</h2>
            <div style={{ marginTop: 12, padding: '16px 20px', background: 'rgba(201,162,39,0.08)', borderRadius: 12, borderLeft: '3px solid var(--gold)' }}>
              <p><strong>Очир Нью Софт ХХК</strong></p>
              <p>Улаанбаатар, Чингэлтэй дүүрэг, 3-р хороо,</p>
              <p>Энхтайваны өргөн чөлөө 19/4, 8 тоот</p>
              <p>Утас: <strong>8070-2326</strong></p>
              <p>И-мэйл: <strong>sonsooch99@gmail.com</strong></p>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}