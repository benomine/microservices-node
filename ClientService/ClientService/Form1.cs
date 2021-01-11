using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Text;
using System.Windows.Forms;

namespace ClientService
{
    public partial class Form1 : Form
    {
        private readonly HttpClient client;

        public Form1()
        {
            InitializeComponent();
            client = new HttpClient(new HttpClientHandler()
            {
                ServerCertificateCustomValidationCallback = HttpClientHandler.DangerousAcceptAnyServerCertificateValidator
            });
        }

        private async void Button1_Click(object sender, EventArgs e)
        {
            try
            {
                double temp = double.Parse(textBox1.Text);
                var sens = radioButton1.Checked ? 1 : 0;
                var conversionRequest = new Conversion
                {
                    Nom = Environment.MachineName,
                    NomUser = Environment.UserName,
                    DateAppel = DateTime.Now,
                    Valeur = temp,
                    Sens = sens
                };

                var uri = new Uri("https://localhost:6001/api/conversiontemperature");
                var json = JsonConvert.SerializeObject(conversionRequest);
                var data = new StringContent(json, Encoding.UTF8, "application/json");

                var response =  await client.PostAsync(uri, data);
                var result = response.Content.ReadAsStringAsync();

                textBox2.Text = result.Result;
            }
            catch
            {
                MessageBox.Show("Veuillez n'entrer que des nombres");
            }
        }
    }
}
