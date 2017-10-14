class HashdocumentsController < ApplicationController
  before_action :set_hashdocument, only: [:show, :update, :destroy, :getOwner]

  # GET /hashdocuments
  def index
    @hashdocuments = Hashdocument.all
    render json: @hashdocuments
  end

  # GET /hashdocuments/1
  def show
    render json: @hashdocument
  end

  # GET /hashdocuments/getByPath
  def getByPath
    @hashdocument = Hashdocument.find_by_path(params[:path])
    if @hashdocument.nil?
      render status: 400
    else
      render json: @hashdocument
    end
  end

  # GET /hashdocuments/getByPath
  def show_by_path
    @hashdocument = Hashdocument.find_by_path(params[:path])
    if @hashdocument.nil?
      return render json: {"status" => 400, "message" => "invalid path", "bad request" => 'not found results'}, status: 400
    else
      render json: @hashdocument
    end
  end

  # POST /hashdocuments
  def create
    @hashdocument = Hashdocument.new(hashdocument_params)
    if @hashdocument.valid?
      if @hashdocument.save
        render json: @hashdocument, status: :created, location: @hashdocument
      else
        render json: @hashdocument.errors, status: :unprocessable_entity
      end
    else
      render json: {"status" => 400, "message" => "invalid path", "bad request" => @hashdocument.errors[:path]}, status: 400
    end
  end

  def getOwner
    if @hashdocument.nil?
      render status: 404
    else
      render json: {owner: @hashdocument[:path].split('/')[0]}, status: 200
    end
  end

  # PATCH/PUT /hashdocuments/1
  def update
    if @hashdocument.update(hashdocument_params)
      render json: @hashdocument
    else
      render json: @hashdocument.errors, status: :unprocessable_entity
    end
  end

  # DELETE /hashdocuments/1
  def destroy
    @hashdocument.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_hashdocument
      @hashdocument = Hashdocument.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def hashdocument_params
      params.require(:hashdocument).permit(:path)
    end
end
