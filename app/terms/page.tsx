import Link from 'next/link';

export default function TermsPage() {
  return (
    <main className="page-main">
      <div className="container" style={{ maxWidth: 800, margin: '0 auto', padding: '24px 16px' }}>
        <div className="page-header" style={{ marginBottom: 40 }}>
          <div className="section-kicker">Хууль, эрх зүй</div>
          <h1>Үйлчилгээний нөхцөл</h1>
          <p className="small-meta" style={{ marginTop: 8 }}>
            Сүүлд шинэчлэгдсэн: 2025 оны 05-р сарын 01
          </p>
        </div>

        <div style={{ lineHeight: 1.85, color: 'var(--text)', fontSize: '0.97rem' }}>

          <section style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: '1.15rem', marginBottom: 12 }}>1. Ерөнхий зүйл</h2>
            <p>
              Энэхүү Үйлчилгээний нөхцөл нь <strong>Очир Нью Софт ХХК</strong> (цаашид "Компани" гэх)-ийн
              эзэмшдэг <strong>uuruu.mn</strong> платформ (цаашид "Платформ" гэх)-ыг ашиглахтай холбоотой
              нөхцөл, шаардлагыг тодорхойлно.
            </p>
            <p style={{ marginTop: 12 }}>
              Платформыг ашигласнаар та 18 нас хүрсэн, эрх зүйн бүрэн чадамжтай иргэн мөн бөгөөд
              энэхүү нөхцөлийг бүрэн уншиж, ойлгож, зөвшөөрснөө баталгаажуулна.
            </p>
          </section>

          <section style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: '1.15rem', marginBottom: 12 }}>2. Үйлчилгээний тодорхойлолт</h2>
            <p>
              <strong>uuruu.mn</strong> нь Монгол Улсад үл хөдлөх хөрөнгийн зар байршуулах онлайн платформ юм.
              Компани нь зар байршуулах талбай, хайлтын үйлчилгээ, холбоо барих боломж олгох техникийн дэд
              бүтцийг хариуцна. <strong>Компани нь үл хөдлөх хөрөнгийн зуучлагч, брокер, эсвэл худалдааны
              талуудын төлөөлөгч биш</strong> бөгөөд хэлцэлд оролцохгүй.
            </p>
          </section>

          <section style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: '1.15rem', marginBottom: 12 }}>3. Бүртгэл, хариуцлага</h2>
            <ul style={{ paddingLeft: 20, marginTop: 10 }}>
              <li style={{ marginBottom: 8 }}>Нэг хүн нэг бүртгэл үүсгэх эрхтэй</li>
              <li style={{ marginBottom: 8 }}>Бүртгэлийн мэдээлэл үнэн зөв байх ёстой</li>
              <li style={{ marginBottom: 8 }}>Нэвтрэх нэр, нууц үгийн аюулгүй байдлыг хэрэглэгч өөрөө хариуцна</li>
              <li style={{ marginBottom: 8 }}>Бүртгэлийг бусдад шилжүүлэх, зарах, хуваалцахыг хориглоно</li>
              <li style={{ marginBottom: 8 }}>Бүртгэлд зөвшөөрөлгүй нэвтрэлт илэрсэн тохиолдолд нэн даруй мэдэгдэх үүрэгтэй</li>
              <li style={{ marginBottom: 8 }}>Компани нь энэхүү нөхцөлийг зөрчсөн хэрэглэгчийн бүртгэлийг
урьдчилан мэдэгдэлгүйгээр түр хаах, устгах эрхтэй.</li>
            </ul>
          </section>

          <section style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: '1.15rem', marginBottom: 12 }}>4. Зар байршуулах дүрэм</h2>
            <p><strong>4.1 Зөвшөөрөгдсөн зар</strong></p>
            <ul style={{ paddingLeft: 20, marginTop: 8, marginBottom: 16 }}>
              <li style={{ marginBottom: 8 }}>Монгол Улсын нутаг дэвсгэр дэх үл хөдлөх хөрөнгийн зар</li>
              <li style={{ marginBottom: 8 }}>Үнэн зөв, дэлгэрэнгүй мэдээлэл бүхий зар</li>
              <li style={{ marginBottom: 8 }}>Зөвхөн зар байршуулагчийн өмчлөл буюу эрх бүхий зар</li>
            </ul>
            <p><strong>4.2 Хориглосон зар</strong></p>
            <ul style={{ paddingLeft: 20, marginTop: 8 }}>
              <li style={{ marginBottom: 8 }}>Хуурамч, төөрөгдүүлсэн мэдээлэл бүхий зар</li>
              <li style={{ marginBottom: 8 }}>Давхардсан зар (нэг объектыг олон удаа байршуулах)</li>
              <li style={{ marginBottom: 8 }}>Эзэмшлийн эрхгүй үл хөдлөхийн зар</li>
              <li style={{ marginBottom: 8 }}>Хууль бус үйл ажиллагааны зориулалттай зар</li>
              <li style={{ marginBottom: 8 }}>Хүний наймаа болон мөлжлөгтэй холбоотой зар</li>
              <li style={{ marginBottom: 8 }}>Луйвар, залилан мэхэлгээтэй зар</li>
              <li style={{ marginBottom: 8 }}>Бусдын хувийн мэдээллийг зөвшөөрөлгүй ашигласан зар Спам шинжтэй зар</li>
              <li style={{ marginBottom: 8 }}>Спам шинжтэй зар</li>
            </ul>
          </section>

          <section style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: '1.15rem', marginBottom: 12 }}>5. Төлбөр, буцаалт</h2>
            <p><strong>5.1 Үйлчилгээний хөлс</strong></p>
            <p style={{ marginTop: 8 }}>
              Зар байршуулах үйлчилгээ нь төлбөртэй бөгөөд үнийн жагсаалт платформд байршина.
              Төлбөр нь QPay-ээр хийгдэнэ.
            </p>
            <p style={{ marginTop: 16 }}><strong>5.2 Буцаалтын бодлого</strong></p>
            <ul style={{ paddingLeft: 20, marginTop: 8 }}>
              <li style={{ marginBottom: 8 }}>Зар нийтлэгдсэний дараа <strong>24 цагийн дотор</strong> хүсэлт гаргасан тохиолдолд бүрэн буцаалт хийгдэнэ</li>
              <li style={{ marginBottom: 8 }}>24 цагаас хойш буцаалт хийгдэхгүй</li>
              <li style={{ marginBottom: 8 }}>Дүрэм зөрчсөн тохиолдолд буцаалт хийгдэхгүй</li>
              <li style={{ marginBottom: 8 }}>Системийн алдааны улмаас төлбөр хийгдсэн тохиолдолд бүрэн буцаалт хийгдэнэ</li>
            </ul>
          </section>

          <section style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: '1.15rem', marginBottom: 12 }}>6. Утасны дугаар харуулах нөхцөл</h2>
            <p>
              Зарын утасны дугаарыг харахын тулд хэрэглэгч <strong>"Утасаар ярих"</strong> товчийг дарж,
              энэхүү үйлчилгээний нөхцөл болон нууцлалын бодлогыг зөвшөөрнө. Зөвшөөрөл өгсөнөөр та:
            </p>
            <ul style={{ paddingLeft: 20, marginTop: 10 }}>
              <li style={{ marginBottom: 8 }}>Мэдээллийг зөвхөн үл хөдлөхийн хэлцэлтэй холбоотой зорилгоор ашиглана</li>
              <li style={{ marginBottom: 8 }}>Зар байршуулагчид спам, луйвар, дарамт үзүүлэхгүй</li>
              <li style={{ marginBottom: 8 }}>Утасны дугаарыг гуравдагч талд дамжуулахгүй</li>
            </ul>
            <p style={{ marginTop: 12 }}>
              Зөрчсөн тохиолдолд хаягийг хаах болон хуулийн дагуу арга хэмжээ авах эрхийг Компани хэвээр хадгална.
            </p>
          </section>

          <section style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: '1.15rem', marginBottom: 12 }}>7. Оюуны өмч</h2>
            <p>
              Платформын загвар, код, лого, текст контент нь <strong>Очир Нью Софт ХХК</strong>-ийн оюуны
              өмч болно. Зар байршуулагчийн зурагнууд нь зар байршуулагчийн өмч хэвээр үлдэнэ. Платформын
              контентыг зөвшөөрөлгүй хуулбарлах, тараах, арилжааны зорилгоор ашиглахыг хориглоно.
            </p>
          </section>

          <section style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: '1.15rem', marginBottom: 12 }}>8. Хариуцлагын хязгаарлалт</h2>
            <p>
              Компани нь платформ дахь зарын мэдээллийн үнэн зөв байдлыг баталгаажуулахгүй бөгөөд
              хэрэглэгчдийн хооронд болон хэрэглэгч, гуравдагч этгээдийн хооронд үүссэн маргаан,
              алдагдалд хариуцлага хүлээхгүй. Үл хөдлөхийн гүйлгээний аливаа эрсдэлийг талууд өөрсдөө хариуцна.
            </p>
            <p style={{ marginTop: 12 }}>
              Хэрэглэгч платформыг өөрийн эрсдэлээр ашиглана.
            </p>
            <p style={{ marginTop: 12 }}>
              Техникийн саатал, системийн алдааны улмаас учирсан хохирлын хувьд Компани нь зөвхөн
              төлсөн үйлчилгээний хөлсний хэмжээнд хариуцлага хүлээнэ.
            </p>

            <p style={{ marginTop: 12 }}>
              Платформ нь техникийн засвар, шинэчлэлтийн улмаас
урьдчилан мэдэгдэлгүйгээр түр зогсож болно.
            </p>
          </section>

          <section style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: '1.15rem', marginBottom: 12 }}>9. Нөхцөлийг зөрчих</h2>
            <p>Дараах тохиолдолд Компани нэн даруй арга хэмжээ авах эрхтэй:</p>
            <ul style={{ paddingLeft: 20, marginTop: 10 }}>
              <li style={{ marginBottom: 8 }}>Хуурамч мэдээлэл байршуулсан тохиолдолд зарыг устгах</li>
              <li style={{ marginBottom: 8 }}>Дүрэм давтан зөрчсөн тохиолдолд бүртгэлийг хаах</li>
              <li style={{ marginBottom: 8 }}>Хууль зөрчсөн тохиолдолд эрх бүхий байгууллагад мэдэгдэх</li>
              <li style={{ marginBottom: 8 }}>Учирсан хохирлыг нэхэмжлэх</li>
            </ul>
          </section>

          <section style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: '1.15rem', marginBottom: 12 }}>10. Маргаан шийдвэрлэх</h2>
            <p>
              Энэхүү нөхцөлтэй холбоотой маргааныг эхлээд харилцан тохиролцоогоор шийдвэрлэхийг эрмэлзэнэ.
              Тохиролцоонд хүрэхгүй тохиолдолд Монгол Улсын холбогдох шүүхэд шилжүүлнэ. Энэхүү нөхцөлд
              <strong> Монгол Улсын хууль тогтоомж</strong> үйлчилнэ.
            </p>
          </section>

          <section style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: '1.15rem', marginBottom: 12 }}>11. Нөхцөлд өөрчлөлт оруулах</h2>
            <p>
              Компани нь үйлчилгээний нөхцөлд өөрчлөлт оруулах эрхтэй бөгөөд өөрчлөлт орсноос хойш
              платформыг үргэлжлүүлэн ашигласнаар та шинэ нөхцөлийг зөвшөөрсөнд тооцогдоно.
            </p>
          </section>

          <section style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: '1.15rem', marginBottom: 12 }}>12. Холбоо барих</h2>
            <div style={{ marginTop: 12, padding: '16px 20px', background: 'rgba(201,162,39,0.08)', borderRadius: 12, borderLeft: '3px solid var(--gold)' }}>
              <p><strong>Очир Нью Софт ХХК</strong></p>
              <p>Улаанбаатар, Чингэлтэй дүүрэг</p>
              <p>Утас: <strong>8070-2326</strong></p>
              <p>И-мэйл: <strong>sonsooch99@gmail.com</strong></p>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}