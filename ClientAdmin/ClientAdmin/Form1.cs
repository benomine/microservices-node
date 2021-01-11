using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Windows.Forms;
using System.Threading.Tasks;
using System.Text;

namespace ClientAdmin
{
    public partial class Form1 : Form
    {
        readonly HttpClient client;

        public Form1()
        {
            InitializeComponent();
            client = new HttpClient(new HttpClientHandler()
            {
                ServerCertificateCustomValidationCallback = HttpClientHandler.DangerousAcceptAnyServerCertificateValidator
            });
            PopulateDataGrid().ConfigureAwait(false);
        }

        private async void Button1_Click(object sender, EventArgs e)
        {
            await PopulateDataGrid();
        }

        private async Task PopulateDataGrid()
        {
            Uri uri = new Uri("https://localhost:5001/api/conversion");
            var response = await client.GetStringAsync(uri);
            List<Conversion> result = JsonConvert.DeserializeObject<List<Conversion>>(response);

            dataGridView1.Columns.Clear();
            dataGridView1.DataSource = result;
            dataGridView1.Columns[0].ReadOnly = true;
            dataGridView1.AutoResizeColumns();
            dataGridView1.AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill;
            DataGridViewImageColumn imageColumn = new DataGridViewImageColumn
            {
                Image = imageList1.Images[0],
                Width = 20,
                AutoSizeMode = DataGridViewAutoSizeColumnMode.AllCells
            };
            dataGridView1.Columns.Add(imageColumn);
        }

        private async void Button3_ClickAsync(object sender, EventArgs e)
        {
            Conversion conversion = (Conversion)dataGridView1.CurrentRow.DataBoundItem;
            await HttpDeleteConversion(conversion.Id);

            await PopulateDataGrid();
        }

        private async Task HttpDeleteConversion(string id)
        {
            var json = JsonConvert.SerializeObject(id);
            Uri uri = new Uri("https://localhost:8001/api/conversion");

            var request = new HttpRequestMessage
            {
                RequestUri = uri,
                Method = HttpMethod.Delete,
                Content = new StringContent(json, Encoding.UTF8, "application/json")
            };
            await client.SendAsync(request);
        }

        private async Task HttpUpdateConversion(Conversion conversion)
        {
            var json = JsonConvert.SerializeObject(conversion);
            Uri uri = new Uri("https://localhost:7001/api/conversion");

            var request = new HttpRequestMessage
            {
                RequestUri = uri,
                Method = HttpMethod.Put,
                Content = new StringContent(json, Encoding.UTF8, "application/json")
            };
            await client.SendAsync(request);
        }

        private async void DataGridView1_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            if (e.ColumnIndex == 5 && e.RowIndex >= 0) //delete icon button is clicked
            {
                Conversion conversion = (Conversion) dataGridView1.CurrentRow.DataBoundItem;
                DialogResult result = MessageBox.Show("Do you want to delete this record?", "Confirmation", MessageBoxButtons.OKCancel);
                if (result == DialogResult.OK)
                {
                    await HttpDeleteConversion(conversion.Id);
                    await PopulateDataGrid();
                }
            }
        }

        private async void DataGridView1_CellEndEdit(object sender, DataGridViewCellEventArgs e)
        {
            Conversion conversion = (Conversion)dataGridView1.CurrentRow.DataBoundItem;
            await HttpUpdateConversion(conversion);
            await PopulateDataGrid();
        }
    }
}
