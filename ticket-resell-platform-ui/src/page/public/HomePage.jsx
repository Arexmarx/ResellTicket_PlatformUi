import { Margin } from "@mui/icons-material";
import Footer from "../../components/Footer.jsx";
import Header from "../../components/Header.jsx"
import SlideShowMain from "../../components/SlideShowMain.jsx"
import SlideShowHotEvent from "../../components/SlideShowHotEvent.jsx"
import SlideShowDetail from "../../components/SlideShowDetail.jsx";
export default function HomePage() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <main style={{ marginTop:'5%'}}>
                <SlideShowMain />
                <SlideShowHotEvent />
                <SlideShowDetail Event="Nhạc"/>
                <SlideShowDetail Event="Show Ánh Sáng"/>
            </main>
            <Footer />
        </div>
    );
}