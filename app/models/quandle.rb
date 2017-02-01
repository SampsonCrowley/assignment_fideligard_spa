class Quandle
  QUANDLE = "#{Rails.application.secrets.quandl}#{Rails.application.secrets.quandl_key}"
  def self.all(date)
    if(json = exists(date.strftime("%Y-%m-%d")))
      return json
    end
    run(date)
  end

  def self.run(date)
    json = {}
    start = (Date.today - date).to_i
    today, takes = get(start)
    (takes-start).downto(0) do |n|
      str = (date - n.days).strftime("%Y-%m-%d")
      json[str] = today

      Stock.create(date: str, data: json[str]) if(!exists(str))
    end
    json
  end

  def self.exists(date)
    res = Stock.find_by(date: date)
    if res
      json = {}
      json[res.date] = res.data
      return json
    end
    return false
  end

  def self.get(days)
    json = []
    start = days
    loop do
      begin
        str = "#{QUANDLE}&date=#{days.days.ago.strftime("%Y-%m-%d")}"
        if(json = exists(str))
          break
        end
        res = JSON.parse(HTTParty.get(str).body)
        data = res["datatable"]["data"]
        if data.length > 0 || days - start > 3
          json = normalize(data)
          break
        end
      rescue
        puts res
      ensure
        days += 1
      end
    end
    [json, days]
  end

  def self.normalize(arr)
    json = {}
    arr.each do |stock|
      symbol = stock[0]
      json[symbol] = {
        open: stock[2],
        high: stock[3],
        low: stock[4],
        close: stock[5],
        volume: stock[6]
      }
    end
    json
  end
end
