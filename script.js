function handleCaseTypeChange() {
	const caseType = document.getElementById("caseType").value;
	const penggugatSection = document.getElementById("penggugatSection");
	const pemohonSection = document.getElementById("pemohonSection");
	const separatorAfterJenisPerkara = document.getElementById("separatorAfterJenisPerkara");
	const separatorAfterPenggugat = document.getElementById("separatorAfterPenggugat");
	const additionalFields = document.getElementById("additionalFields");
	const resultContainer = document.getElementById("result");

			// Reset results
	resultContainer.innerHTML = '';
			
			// Reset Penggugat/Pemohon values
	document.getElementById("penggugat").value = "1";
	document.getElementById("pemohon").value = "1";
	
	// Reset Saksi value if it exists
	const saksiInput = document.getElementById("saksi");
	if (saksiInput) {
		saksiInput.value = "2";
	}
		  
	// Show or hide "Jumlah Penggugat" or "Jumlah Pemohon" based on case type
	if (caseType === "1000" || caseType === "800") {
		penggugatSection.style.display = "block";
		pemohonSection.style.display = "none";
		separatorAfterJenisPerkara.style.display = "block";
		separatorAfterPenggugat.style.display = "block";
		addTergugatSection();
	} else if (caseType === "600") { // Permohonan case
		penggugatSection.style.display = "none";
		pemohonSection.style.display = "block";
		separatorAfterJenisPerkara.style.display = "block";
		separatorAfterPenggugat.style.display = "block";
		additionalFields.innerHTML = ''; // No Tergugat for Permohonan case
	} else {
		penggugatSection.style.display = "none";
		pemohonSection.style.display = "none";
		separatorAfterJenisPerkara.style.display = "none";
		separatorAfterPenggugat.style.display = "none";
		additionalFields.innerHTML = '';
	}
	addSaksiSection();
}
function addTergugatSection() {
    const additionalFields = document.getElementById("additionalFields");
    additionalFields.innerHTML = ''; // Clear previous entries
    const tergugatContainer = document.createElement("div");
    tergugatContainer.id = "tergugatContainer";
    tergugatContainer.classList.add("input-group");
    const tergugatLabel = document.createElement("label");
    tergugatLabel.innerText = " Jumlah Tergugat";
    tergugatContainer.appendChild(tergugatLabel);
    additionalFields.appendChild(tergugatContainer);
    addTergugat();
    const addTergugatBtn = document.createElement("button");
    addTergugatBtn.classList.add("add-tergugat-btn");
    addTergugatBtn.innerText = "Tambah Tergugat";
    addTergugatBtn.type = "button";
    addTergugatBtn.onclick = addTergugat;
    additionalFields.appendChild(addTergugatBtn);  // Separator under "Tambah Tergugat" button
    const tergugatSeparator = document.createElement("div");
    tergugatSeparator.classList.add("section-separator");
    tergugatSeparator.style.display = "block";
    additionalFields.appendChild(tergugatSeparator);
}
function addSaksiSection() {
    const additionalFields = document.getElementById("additionalFields");      // Add Saksi Section
    const saksiField = document.createElement("div");
    saksiField.classList.add("input-group");
    saksiField.style.marginTop = "15px";
    saksiField.innerHTML = `
        <label for="saksi">Jumlah Saksi</label>
        <div class="number-controls">
            <button type="button" onclick="decreaseSaksi()">-</button>
            <input type="number" id="saksi" value="2" min="2">
            <button type="button" onclick="increaseSaksi()">+</button>
        </div>
    `;
    additionalFields.appendChild(saksiField);
}
function addTergugat() {
	const tergugatContainer = document.getElementById("tergugatContainer");
	const isFirstTergugat = tergugatContainer.children.length === 1; // Only label exists
	const tergugatEntry = document.createElement("div");
	tergugatEntry.classList.add("tergugat-controls");

	const inputField = document.createElement("input");
	inputField.setAttribute("list", "kecamatanList");
	inputField.setAttribute("placeholder", "Pilih atau cari Kecamatan...");
	inputField.style.flex = "1";

	const tergugatLabel = document.createElement("span");
	tergugatLabel.innerText = `Tergugat: `;

	tergugatEntry.appendChild(tergugatLabel);
	tergugatEntry.appendChild(inputField);

	// Only add remove button if it's not the first Tergugat
	if (!isFirstTergugat) {
		const removeBtn = document.createElement("button");
		removeBtn.type = "button";
		removeBtn.innerText = "-";
		removeBtn.classList.add("remove");
		removeBtn.onclick = () => tergugatEntry.remove();
		tergugatEntry.appendChild(removeBtn);
	}

	tergugatContainer.appendChild(tergugatEntry);
}
function increasePenggugat() {
    const penggugatInput = document.getElementById("penggugat");
    penggugatInput.value = parseInt(penggugatInput.value) + 1;
}
function decreasePenggugat() {
    const penggugatInput = document.getElementById("penggugat");
    if (parseInt(penggugatInput.value) > 0) {
        penggugatInput.value = parseInt(penggugatInput.value) - 1;
    }
}
function increasePemohon() {
    const pemohonInput = document.getElementById("pemohon");
    pemohonInput.value = parseInt(pemohonInput.value) + 1;
}
function decreasePemohon() {
    const pemohonInput = document.getElementById("pemohon");
    if (parseInt(pemohonInput.value) > 0) {
        pemohonInput.value = parseInt(pemohonInput.value) - 1;
    }
}
function increaseSaksi() {
    const saksiInput = document.getElementById("saksi");
    saksiInput.value = parseInt(saksiInput.value) + 1;
}
function decreaseSaksi() {
    const saksiInput = document.getElementById("saksi");
    if (parseInt(saksiInput.value) > 2) {
        saksiInput.value = parseInt(saksiInput.value) - 1;
    }
}
const tarifPos = {
	"Tidak Diketahui": 1350000,
	"Abeli": 57000,
	"Baruga": 57000,
	"Kadia": 57000,
	"Kambu": 57000,
	"Kendari": 57000,
	"Kendari Barat": 57000,
	"Mandonga": 57000,
	"Nambo": 57000,
	"Poasia": 57000,
	"Puuwatu": 57000,
	"Wua-Wua": 57000,
	"Betoambari": 84000,
	"Bungi": 84000,
	"Kokalukuna": 84000,
	"Lea-Lea": 84000,
	"Murhum": 84000,
	"Sorawolio": 84000,
	"Wolio": 84000,
	"Kabaena": 87000,
	"Kabaena Barat": 87000,
	"Kabaena Selatan": 87000,
	"Kabaena Tengah": 87000,
	"Kabaena Timur": 87000,
	"Kabaena Utara": 87000,
	"Lantari Jaya": 87000,
	"Mata Oleo": 87000,
	"Mata Usu": 87000,
	"Poleang": 87000,
	"Poleang Barat": 87000,
	"Poleang Selatan": 87000,
	"Poleang Tengah": 87000,
	"Poleang Tenggara": 87000,
	"Poleang Timur": 87000,
	"Poleang Utara": 87000,
	"Rarowatu": 87000,
	"Rarowatu Utara": 87000,
	"Rumbia": 87000,
	"Rumbia Tengah": 87000,
	"Tontonunu": 87000,
	"Towewe": 87000,
	"Kapontori": 99000,
	"Lasalimu": 99000,
	"Lasalimu Selatan": 99000,
	"Pasar Wajo": 99000,
	"Siontapina": 99000,
	"Wabula": 99000,
	"Wolowa": 99000,
	"Batauga": 90000,
	"Batu Atas": 90000,
	"Kadatua": 90000,
	"Lapandewa": 90000,
	"Sampolawa": 90000,
	"Siompu": 90000,
	"Siompu Barat": 90000,
	"Gu": 90000,
	"Lakudo": 90000,
	"Mawasangka": 90000,
	"Mawasangka Tengah": 90000,
	"Mawasangka Timur": 90000,
	"Sangia Wambulu": 90000,
	"Talaga Raya": 90000,
	"Bonegunu": 87000,
	"Kambowa": 87000,
	"Kulisusu": 87000,
	"Kulisusu Barat": 87000,
	"Kulisusu Utara": 87000,
	"Wakorumba Utara": 87000,
	"Baula": 42000,
	"Iwoimendaa": 42000,
	"Kolaka": 42000,
	"Latambaga": 42000,
	"Pomalaa": 42000,
	"Samaturu": 42000,
	"Tanggetada": 42000,
	"Toari": 42000,
	"Watubangga": 42000,
	"Wolo": 42000,
	"Wundulako": 42000,
	"Aere": 57000,
	"Dangia": 57000,
	"Ladongi": 57000,
	"Lambandia": 57000,
	"Loea": 57000,
	"Mowewe": 57000,
	"Poli-Polia": 57000,
	"Tinondo": 57000,
	"Tirawuta": 57000,
	"Uluiwoi": 57000,
	"Ueesi": 57000,
	"Batu Putih": 57000,
	"Katoi": 57000,
	"Kodeoha": 57000,
	"Lambai": 57000,
	"Lasusua": 57000,
	"Ngapa": 57000,
	"Pakue": 57000,
	"Pakue Tengah": 57000,
	"Pakue Utara": 57000,
	"Porehu": 57000,
	"Rante Angin": 57000,
	"Tolala": 57000,
	"Watunohu": 57000,
	"Wawo": 57000,
	"Abuki": 57000,
	"Amonggedo": 57000,
	"Anggaberi": 57000,
	"Asinua": 57000,
	"Besulutu": 57000,
	"Bondoala": 57000,
	"Kapoiala": 57000,
	"Konda": 57000,
	"Lambuya": 57000,
	"Latoma": 57000,
	"Meluhu": 57000,
	"Onembute": 57000,
	"Pondidaha": 57000,
	"Puriala": 57000,
	"Routa": 57000,
	"Sampara": 57000,
	"Soropia": 57000,
	"Tongauna": 57000,
	"Tongauna Utara": 57000,
	"Uepai": 57000,
	"Unaaha": 57000,
	"Wawotobi": 57000,
	"Wonggeduku": 57000,
	"Wonggeduku Barat": 57000,
	"Wawonii Barat": 87000,
	"Wawonii Selatan": 87000,
	"Wawonii Tengah": 87000,
	"Wawonii Tenggara": 87000,
	"Wawonii Timur": 87000,
	"Wawonii Timur Laut": 87000,
	"Wawonii Utara": 87000,
	"Andoolo": 57000,
	"Andoolo Barat": 57000,
	"Angata": 57000,
	"Baito": 57000,
	"Basala": 57000,
	"Benua": 57000,
	"Buke": 57000,
	"Kolono": 57000,
	"Kolono Timur": 57000,
	"Laeya": 57000,
	"Lainea": 57000,
	"Lalembuu": 57000,
	"Landono": 57000,
	"Laonti": 57000,
	"Moramo": 57000,
	"Moramo Utara": 57000,
	"Mowila": 57000,
	"Palangga": 57000,
	"Palangga Selatan": 57000,
	"Ranomeeto": 57000,
	"Ranomeeto Barat": 57000,
	"Tinanggea": 57000,
	"Wolasi": 57000,
	"Asera": 57000,
	"Andowia": 57000,
	"Langgikima": 57000,
	"Lasolo": 57000,
	"Lasolo Kepulauan": 57000,
	"Lembo": 57000,
	"Molawe": 57000,
	"Motui": 57000,
	"Oheo": 57000,
	"Sawa": 57000,
	"Wiwirano": 57000,
	"Batukara": 87000,
	"Bone": 87000,
	"Duruka": 87000,
	"Kabangka": 87000,
	"Kabawo": 87000,
	"Katobu": 87000,
	"Kontukowuna": 87000,
	"Kontunaga": 87000,
	"Lawa": 87000,
	"Lohia": 87000,
	"Maligano": 87000,
	"Marobo": 87000,
	"Napabalano": 87000,
	"Parigi": 87000,
	"Pasir Putih": 87000,
	"Sawerigadi": 87000,
	"Tongkuno": 87000,
	"Tongkuno Selatan": 87000,
	"Towea": 87000,
	"Wakorumba Selatan": 87000,
	"Watopute": 87000,
	"Barangka": 87000,
	"Kusambi": 87000,
	"Maginti": 87000,
	"Napano Kusambi": 87000,
	"Tiworo Kepulauan": 87000,
	"Tiworo Selatan": 87000,
	"Tiworo Tengah": 87000,
	"Tiworo Utara": 87000,
	"Wadaga": 87000,
	"Binongko": 99000,
	"Kaledupa": 99000,
	"Kaledupa Selatan": 99000,
	"Tomia": 99000,
	"Tomia Timur": 99000,
	"Wangi-Wangi": 99000,
	"Wangi-Wangi Selatan": 99000
};

function calculateCost() {
	const caseType = document.getElementById("caseType").value;
	const penggugatCount = parseInt(document.getElementById("penggugat").value || 0);
	const pemohonCount = parseInt(document.getElementById("pemohon").value || 0);
	const saksiCount = parseInt(document.getElementById("saksi").value || 0);
	const tergugatInputs = document.querySelectorAll("#tergugatContainer input[list='kecamatanList']");

	let biayaPendaftaran = 30000; // Sama untuk semua kasus
	let biayaATK = 0;
	let pnbpPenggugat = 0;
	let pnbpTergugat = 0;
	let biayaSumpahSaksi = 20000 * saksiCount;
	let biayaRedaksi = 10000;
	let biayaMaterai = 10000;
	let biayaPanggilanTergugat = 0;
	let biayaPemberitahuanPutusan = 0;
	let biayaPencabutanPermohonan = 0;

	// Hitung biaya berdasarkan jumlah tergugat dan tarif pos
	tergugatInputs.forEach(input => {
		const kecamatan = input.value;
		if (tarifPos[kecamatan]) {
			biayaPanggilanTergugat += tarifPos[kecamatan];
		} else {
			console.warn(`Tarif pos untuk kecamatan ${kecamatan} tidak ditemukan.`);
		}
	});

	// Logika perhitungan untuk setiap jenis perkara
	if (caseType === "1000") { // Gugatan
		biayaATK = 100000;
		pnbpPenggugat = 10000 * penggugatCount;
		pnbpTergugat = 10000 * tergugatInputs.length;
		biayaPemberitahuanPutusan = biayaPanggilanTergugat / 3;
	} else if (caseType === "800") { // Gugatan Sederhana
		biayaATK = 50000;
		pnbpPenggugat = 10000 * penggugatCount;
		pnbpTergugat = 10000 * tergugatInputs.length;
		biayaPemberitahuanPutusan = biayaPanggilanTergugat / 3;
	} else if (caseType === "600") { // Permohonan
		biayaATK = 50000;
		pnbpPenggugat = 10000 * pemohonCount;
		biayaPencabutanPermohonan = 10000;
	} else {
		console.error("Jenis perkara tidak valid.");
		return;
	}

	// Total biaya
	const totalBiaya =
		biayaPendaftaran +
		biayaATK +
		pnbpPenggugat +
		pnbpTergugat +
		biayaSumpahSaksi +
		biayaRedaksi +
		biayaMaterai +
		biayaPanggilanTergugat +
		biayaPemberitahuanPutusan +
		biayaPencabutanPermohonan;

	// Simpan hasil kalkulasi untuk digunakan di modal
	window.costCalculation = {
		biayaPendaftaran,
		biayaATK,
		pnbpPenggugat,
		pnbpTergugat,
		biayaSumpahSaksi,
		biayaRedaksi,
		biayaMaterai,
		biayaPanggilanTergugat,
		biayaPemberitahuanPutusan,
		biayaPencabutanPermohonan,
		totalBiaya
	};

	// Tampilkan modal popup
	document.getElementById("notificationModal").style.display = "block";
}
function acknowledgeNotification() {
	// Sembunyikan modal
	document.getElementById('notificationModal').style.display = 'none';

	// Ambil hasil kalkulasi
	const calc = window.costCalculation;

	if (!calc) {
		console.error("Data kalkulasi tidak ditemukan.");
		return;
	}

	// Tampilkan hasil dalam bentuk tabel
	const resultContainer = document.getElementById("result");
	resultContainer.innerHTML = `
		<div style="overflow-x: auto;">
			<table>
				<thead>
					<tr>
						<th>Deskripsi</th>
						<th style="text-align: right;">Biaya (Rp)</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Biaya Pendaftaran</td>
						<td style="text-align: right;">${calc.biayaPendaftaran.toLocaleString()}</td>
					</tr>
					<tr>
						<td>Biaya ATK</td>
						<td style="text-align: right;">${calc.biayaATK.toLocaleString()}</td>
					</tr>
					<tr>
						<td>PNBP Panggilan Penggugat</td>
						<td style="text-align: right;">${calc.pnbpPenggugat.toLocaleString()}</td>
					</tr>
					<tr>
						<td>PNBP Panggilan Tergugat</td>
						<td style="text-align: right;">${calc.pnbpTergugat.toLocaleString()}</td>
					</tr>
					<tr>
						<td>Biaya Sumpah Saksi</td>
						<td style="text-align: right;">${calc.biayaSumpahSaksi.toLocaleString()}</td>
					</tr>
					<tr>
						<td>Biaya Redaksi</td>
						<td style="text-align: right;">${calc.biayaRedaksi.toLocaleString()}</td>
					</tr>
					<tr>
						<td>Biaya Materai</td>
						<td style="text-align: right;">${calc.biayaMaterai.toLocaleString()}</td>
					</tr>
					<tr>
						<td>Biaya Panggilan Tergugat</td>
						<td style="text-align: right;">${calc.biayaPanggilanTergugat.toLocaleString()}</td>
					</tr>
					<tr>
						<td>Biaya Pemberitahuan Putusan</td>
						<td style="text-align: right;">${calc.biayaPemberitahuanPutusan.toLocaleString()}</td>
					</tr>
					${calc.biayaPencabutanPermohonan ? `
					<tr>
						<td>Biaya Pencabutan Permohonan</td>
						<td style="text-align: right;">${calc.biayaPencabutanPermohonan.toLocaleString()}</td>
					</tr>` : ""}
				</tbody>
				<tfoot>
					<tr>
						<th style="border-top: 2px solid #ddd;">Total Biaya</th>
						<th style="border-top: 2px solid #ddd; text-align: right;">${calc.totalBiaya.toLocaleString()}</th>
					</tr>
				</tfoot>
			</table>
		</div>
	`;
}