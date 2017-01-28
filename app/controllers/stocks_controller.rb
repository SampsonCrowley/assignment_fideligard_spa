class StocksController < ApplicationController
  def index
    resp = Quandle.all(Date.today)
    render json: resp
  end

  def show
    date = params[:id].to_date
    resp = Quandle.all(date)
    render json: resp
  end
end
